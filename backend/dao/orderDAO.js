const path = require("path");
const Serializer = require("../serializer/serializer");
const Order = require("../model/order");

class OrderDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/orders.csv");
		this.serializer = new Serializer();
		this.orders = this.serializer.fromCSV(this.filePath, Order);
	}

	getAll() {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		return this.orders.filter((order) => !order.isDeleted);
	}

	save(order) {
		order.id = this.nextId();
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		this.orders.push(order);
		this.serializer.toCSV(this.filePath, this.orders);
		return order;
	}

	getByUserId(userId) {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		return this.orders.filter(order => order.userId == userId && !order.isDeleted);
	}

	getById(orderId) {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		return this.orders.find(order => order.id == orderId && !order.isDeleted);
	}

	nextId() {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		if (this.orders.length < 1) {
			return 1;
		}
		return Math.max(...this.orders.map((order) => order.id)) + 1;
	}

	update(order) {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		const index = this.orders.findIndex((o) => o.id === order.id);
		if (index !== -1) {
			this.orders[index] = order;
			this.serializer.toCSV(this.filePath, this.orders);
		}
		return order;
	}

	delete(order) {
		this.orders = this.serializer.fromCSV(this.filePath, Order);
		const index = this.orders.findIndex((o) => o.id === order.id);
		if (index !== -1) {
			this.orders[index].isDeleted = true;
			this.serializer.toCSV(this.filePath, this.orders);
		}
	}
}

module.exports = OrderDAO;
