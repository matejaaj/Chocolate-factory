class User {
	constructor(
		username,
		password,
		firstName,
		lastName,
		gender,
		birthDate,
		role = null
	) {
		this.id = null;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.isBlocked = false;
		this.isDeleted = false;
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
			this.role,
			this.isBlocked ? "true" : "false",
			this.isDeleted ? "true" : "false",
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
			this.role,
			this.isBlocked,
			this.isDeleted,
		] = values;

		this.id = parseInt(this.id);
		this.isBlocked = this.isBlocked
			? this.isBlocked.toLowerCase() === "true"
			: false;
		this.isDeleted = this.isDeleted
			? this.isDeleted.toLowerCase() === "true"
			: false;
	}
}

module.exports = User;
