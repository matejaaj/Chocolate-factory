class Customer {
	constructor(id) {
		this.points = 0;
		this.customerTypeId = 0;
		this.id = id;
	}

	toCSV() {
		return [this.id, this.points, this.customerTypeId];
	}

	fromCSV(values) {
		[this.id, this.points, this.customerTypeId] = values;
		this.id = parseInt(this.id);
		this.points = parseInt(this.points);
		this.customerTypeId = parseInt(this.customerTypeId);
	}
}

module.exports = Customer;
