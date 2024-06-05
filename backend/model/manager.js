const User = require("./user");

class Manager extends User {
	constructor(
		username,
		password,
		firstName,
		lastName,
		gender,
		birthDate,
		chocolateFactoryId
	) {
		super(
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			"MANAGER"
		);
		this.factoryId = chocolateFactoryId;
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
			this.factoryId,
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
			this.factoryId,
		] = values;
	}
}

module.exports = Manager;
