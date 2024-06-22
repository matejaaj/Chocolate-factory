const OrderService = require("../services/orderService");

class OrderController {
	constructor() {
		this.orderService = new OrderService();
	}

	getAllOrders(req, res) {
		const search = req.query.search ? JSON.parse(req.query.search) : {};
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
		const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
		const orders = this.orderService.getAllOrders(search, filter, sort);
		res.json(orders);
	}

	getOrdersByFactoryId(req, res) {
		const factoryId = parseInt(req.params.factoryId, 10);
		const orders = this.orderService.getOrdersByFactoryId(factoryId);
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

	acceptOrder(req, res) {
		const id = req.params.id;
		const result = this.orderService.acceptOrder(id);
		if (result) {
			res.status(200).send("Order accepted");
		} else {
			res.status(404).send("Order not found or already processed");
		}
	}

	declineOrder(req, res) {
		const id = req.params.id;
		const reason = req.body.reason;
		const result = this.orderService.declineOrder(id, reason);
		if (result) {
			res.status(200).send("Order declined");
		} else {
			res.status(404).send("Order not found or already processed");
		}
	}
}

module.exports = OrderController;
