const OrderDAO = require("../dao/orderDAO");
const Order = require("../model/order");
const CustomerService = require("./customerService");
const CartService = require("./cartService");
const ChocolateService = require("./chocolateService");

class OrderService {
	constructor() {
		this.orderDAO = new OrderDAO();
		this.customerService = new CustomerService();
		this.cartService = new CartService();
		this.chocolateService = new ChocolateService();
	}

	getAllOrders() {
		return this.orderDAO.getAll();
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
