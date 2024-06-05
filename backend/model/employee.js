const User = require("./user");

class Employee extends User {
	constructor(username, password, firstName, lastName, gender, birthDate) {
		super(
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			"EMPLOYEE"
		);
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
		] = values;
	}
}

module.exports = Employee;
