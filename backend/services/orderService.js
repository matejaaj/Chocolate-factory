const OrderDAO = require("../dao/orderDAO");
const Order = require("../model/order");
const CustomerService = require("./customerService");
const CartService = require("./cartService");

class OrderService {
	constructor() {
		this.orderDAO = new OrderDAO();
		this.customerService = new CustomerService();
		this.cartService = new CartService();
	}

	getAllOrders() {
		return this.orderDAO.getAll();
	}

	createOrder(totalPrice, cartItemIds, userId) {
		const newOrder = new Order(
			userId,
			totalPrice,
			cartItemIds,
			new Date().toISOString(),
			"Obrada"
		);

		const createdOrder = this.orderDAO.save(newOrder);

		const points = (totalPrice / 1000) * 133;
		this.customerService.addPoints(userId, points);
		this.cartService.markItemsAsOrdered(cartItemIds);

		return createdOrder;
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

	cancelOrder(id) {
		const existingOrder = this.orderDAO.getById(id);
		if (existingOrder && existingOrder.status === "Obrada") {
			existingOrder.status = "Otkazano";
			this.orderDAO.update(existingOrder);

			const totalPrice = existingOrder.totalPrice;
			const points = - (totalPrice / 1000) * 133 * 4;
			this.customerService.addPoints(existingOrder.userId, points);	

			return true;
		}
		return false;
	}

	getOrdersByUserId(userId) {
		return this.orderDAO.getAll().filter(order => order.userId == userId);
	}
}

module.exports = OrderService;
