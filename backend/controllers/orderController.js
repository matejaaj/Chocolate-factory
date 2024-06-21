const OrderService = require("../services/orderService");

class OrderController {
	constructor() {
		this.orderService = new OrderService();
	}

	getAllOrders(req, res) {
		const orders = this.orderService.getAllOrders();
		res.json(orders);
	}

	createOrder(req, res) {
		const userId = req.userId;
		const createdOrders = this.orderService.createOrder(userId);
		res.status(201).json(createdOrders);
	}

	getOrderById(req, res) {
		const order = this.orderService.getOrderById(req.params.id);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	}

	getOrdersByUserId(req, res) {
		const orders = this.orderService.getOrdersByUserId(req.userId);
		res.json(orders);
	}

	updateOrder(req, res) {
		const updatedOrder = this.orderService.updateOrder(req.params.id, req.body);
		if (updatedOrder) {
			res.json(updatedOrder);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	}

	cancelOrder(req, res) {
		const success = this.orderService.cancelOrder(req.params.id);
		if (success) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Order not found or cannot be canceled" });
		}
	}
}

module.exports = OrderController;
