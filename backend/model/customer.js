class Customer {
	constructor(userId, points = 0, customerTypeId = null, id = null) {
		this.userId = userId;
		this.points = points;
		this.customerTypeId = customerTypeId;
		this.id = id;
	}

	toCSV() {
		return [this.id, this.userId, this.points, this.customerTypeId];
	}

	fromCSV(values) {
		[this.id, this.userId, this.points, this.customerTypeId] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
		this.points = parseInt(this.points);
		this.customerTypeId = parseInt(this.customerTypeId);
	}
}

module.exports = Customer;
