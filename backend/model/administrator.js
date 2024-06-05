const User = require("./user");

class Administrator extends User {
	constructor(username, password, firstName, lastName, gender, birthDate) {
		super(
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			"ADMINISTRATOR"
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

module.exports = Administrator;
