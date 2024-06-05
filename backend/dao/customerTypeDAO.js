const path = require("path");
const Serializer = require("../serializer/serializer");
const CustomerType = require("../model/customerType");

class CustomerTypeDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/customerType.csv");
		this.serializer = new Serializer();
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, CustomerType);
	}

	save(customerType) {
		customerType.id = this.nextId();
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
		this.customerTypes.push(customerType);
		this.serializer.toCSV(this.filePath, this.customerTypes);
		return customerType;
	}

	nextId() {
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
		if (this.customerTypes.length < 1) {
			return 1;
		}
		return Math.max(...this.customerTypes.map((ct) => ct.id)) + 1;
	}

	delete(customerType) {
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
		const index = this.customerTypes.findIndex(
			(ct) => ct.id === customerType.id
		);
		if (index !== -1) {
			this.customerTypes.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.customerTypes);
		}
	}

	update(customerType) {
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
		const index = this.customerTypes.findIndex(
			(ct) => ct.id === customerType.id
		);
		if (index !== -1) {
			this.customerTypes[index] = customerType;
			this.serializer.toCSV(this.filePath, this.customerTypes);
		}
		return customerType;
	}

	getById(customerTypeId) {
		this.customerTypes = this.serializer.fromCSV(this.filePath, CustomerType);
		return this.customerTypes.find(
			(customerType) => customerType.id === customerTypeId
		);
	}
}

module.exports = CustomerTypeDAO;
