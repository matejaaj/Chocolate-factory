class CustomerType {
	constructor(name, discount, pointsRequired) {
		this.id = null;
		this.name = name;
		this.discount = discount;
		this.pointsRequired = pointsRequired;
	}

	toCSV() {
		return [this.id, this.name, this.discount, this.pointsRequired];
	}

	fromCSV(values) {
		[this.id, this.name, this.discount, this.pointsRequired] = values;
	}
}

module.exports = CustomerType;
