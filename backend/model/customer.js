class Customer {
	constructor(id, points = 0, customerTypeId = null) {
		this.points = points;
		this.customerTypeId = customerTypeId;
		this.id = id;
	}

	toCSV() {
		return [this.id, this.userId, this.points, this.customerTypeId];
	}

	fromCSV(values) {
		[this.id, this.points, this.customerTypeId] = values;
		this.id = parseInt(this.id);
		this.points = parseInt(this.points);
		this.customerTypeId = parseInt(this.customerTypeId);
	}
}

module.exports = Customer;
