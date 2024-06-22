const OrderDAO = require("../dao/orderDAO");
const Order = require("../model/order");
const CustomerService = require("./customerService");
const CartService = require("./cartService");
const ChocolateService = require("./chocolateService");
const FactoryService = require("./factoryService");

class OrderService {
	constructor() {
		this.orderDAO = new OrderDAO();
		this.customerService = new CustomerService();
		this.cartService = new CartService();
		this.chocolateService = new ChocolateService();
		this.factoryService = new FactoryService();
	}

	getAllOrders(search = {}, filter = {}, sort = {}) {
		let orders = this.orderDAO.getAll();
		let factories = this.factoryService.getAllFactories();

		// Merge factory data
		orders = orders.map((order) => {
			const factory = factories.find((f) => f.id == order.factoryId);
			if (factory) {
				order.factoryName = factory.name;
			} else {
				order.factoryName = "Unknown Factory";
			}
			return order;
		});

		// Apply search filters
		if (search.factoryName) {
			orders = orders.filter((order) =>
				order.factoryName.toLowerCase().includes(search.factoryName.toLowerCase())
			);
		}
		if (search.minPrice != undefined && search.maxPrice != undefined) {
			const minPrice = parseFloat(search.minPrice);
			const maxPrice = parseFloat(search.maxPrice);
			orders = orders.filter((order) => order.totalPrice >= minPrice && order.totalPrice <= maxPrice);
		}
		if (search.startDate && search.endDate) {
			const startDate = new Date(search.startDate);
			const endDate = new Date(search.endDate);
			orders = orders.filter((order) => {
				const orderDate = new Date(order.date);
				return orderDate >= startDate && orderDate <= endDate;
			});
		}

		// Apply sorting
		if (sort && sort.field) {
			orders.sort((a, b) => {
				if (a[sort.field] < b[sort.field]) return sort.order === "asc" ? -1 : 1;
				if (a[sort.field] > b[sort.field]) return sort.order === "asc" ? 1 : -1;
				return 0;
			});
		}

		return orders;
	}

	createOrder(userId) {
		const cartItems = this.cartService.getCart(userId);
		const groupedByFactory = {};

		cartItems.forEach(item => {
			if (!groupedByFactory[item.factoryId]) {
				groupedByFactory[item.factoryId] = [];
			}
			groupedByFactory[item.factoryId].push(item);
		});

		const createdOrders = Object.keys(groupedByFactory).map(factoryId => {
			const items = groupedByFactory[factoryId];
			const totalPrice = items.reduce((acc, item) => {
				const chocolate = this.chocolateService.getChocolateById(item.chocolateId);
				return acc + (chocolate.price * item.quantity);
			}, 0);
			const cartItemIds = items.map(item => item.id);
			const chocolateIds = items.map(item => item.chocolateId);

			const newOrder = new Order(
				userId,
				totalPrice,
				chocolateIds,
				new Date().toISOString(),
				"Obrada",
				parseInt(factoryId)
			);

			this.orderDAO.save(newOrder);

			const points = (totalPrice / 1000) * 133;
			this.customerService.addPoints(userId, points);
			this.cartService.markItemsAsOrdered(cartItemIds);

			return newOrder;
		});

		return createdOrders;
	}

	cancelOrder(id) {
		const existingOrder = this.orderDAO.getById(id);
		if (existingOrder && existingOrder.status === "Obrada") {
			existingOrder.status = "Otkazano";
			this.orderDAO.update(existingOrder);

			const pointsToDeduct = (existingOrder.totalPrice / 1000) * 133 * 4;
			this.customerService.addPoints(existingOrder.userId, -pointsToDeduct);

			return true;
		}
		return false;
	}

	acceptOrder(id) {
		const existingOrder = this.orderDAO.getById(id);
		if (existingOrder && existingOrder.status === "Obrada") {
			existingOrder.status = "Odobreno";
			this.orderDAO.update(existingOrder);
			return true;
		}
		return false;
	}

	declineOrder(id, reason) {
		const existingOrder = this.orderDAO.getById(id);
		if (existingOrder && existingOrder.status === "Obrada") {
			existingOrder.status = "Odbijeno";
			existingOrder.declineReason = reason; // Add reason for decline
			this.orderDAO.update(existingOrder);
			return true;
		}
		return false;
	}

	getOrdersByFactoryId(factoryId) {
		const orders = this.orderDAO.getAll();
		const factories = this.factoryService.getAllFactories();

		return orders
			.filter(order => order.factoryId == factoryId)
			.map(order => {
				const factory = factories.find(f => f.id == order.factoryId);
				if (factory) {
					order.factoryName = factory.name;
				}
				return order;
			});
	}

	getOrdersByUserId(userId) {
		return this.orderDAO.getByUserId(userId);
	}

	getOrderById(id) {
		return this.orderDAO.getById(id);
	}

	updateOrder(id, data) {
		const existingOrder = this.orderDAO.getById(id);
		if (existingOrder) {
			existingOrder.status = data.status || existingOrder.status;
			this.orderDAO.update(existingOrder);
			return existingOrder;
		}
		return null;
	}
}

module.exports = OrderService;
