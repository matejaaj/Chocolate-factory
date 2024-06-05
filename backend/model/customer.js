const User = require("./user");

class Customer extends User {
	constructor(
		username,
		password,
		firstName,
		lastName,
		gender,
		birthDate,
		points = 0,
		customerTypeId = null
	) {
		super(
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			"CUSTOMER"
		);
		this.points = points;
		this.customerTypeId = customerTypeId;
	}

	toCSV() {
		return [
			this.id,
			this.username,
			this.password,
			this.firstName,
			this.lastName,
			this.gender,
			this.birthDate,
			this.points,
			this.customerTypeId,
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.username,
			this.password,
			this.firstName,
			this.lastName,
			this.gender,
			this.birthDate,
			this.points,
			this.customerTypeId,
		] = values;
	}
}

module.exports = Customer;
