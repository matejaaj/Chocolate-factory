const path = require("path");
const Serializer = require("../serializer/serializer");
const Customer = require("../model/customer");

class CustomerDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/customers.csv");
		this.serializer = new Serializer();
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Customer);
	}

	save(customer) {
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
		this.customers.push(customer);
		this.serializer.toCSV(this.filePath, this.customers);
		return customer;
	}

	nextId() {
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
		if (this.customers.length < 1) {
			return 1;
		}
		return Math.max(...this.customers.map((c) => c.id)) + 1;
	}

	delete(customer) {
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
		const index = this.customers.findIndex((c) => c.id === customer.id);
		if (index !== -1) {
			this.customers.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.customers);
		}
	}

	update(customer) {
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
		const index = this.customers.findIndex((c) => c.id === customer.id);
		if (index !== -1) {
			this.customers[index] = customer;
			this.serializer.toCSV(this.filePath, this.customers);
		}
		return customer;
	}

	getById(customerId) {
		this.customers = this.serializer.fromCSV(this.filePath, Customer);
		return this.customers.find((customer) => customer.id === customerId);
	}
}

module.exports = CustomerDAO;
