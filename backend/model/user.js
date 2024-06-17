class User {
	constructor(
		username,
		password,
		firstName,
		lastName,
		gender,
		birthDate,
		role = null,
		subtypeId = null
	) {
		this.id = null;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.subtypeId = subtypeId;
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
			this.subtypeId,
			this.isBlocked ? "true" : "false",
			this.isDeleted ? "true" : "false",
		].join(",");
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
			this.subtypeId,
			this.isBlocked,
			this.isDeleted,
		] = values;

		this.id = parseInt(this.id);
		this.subtypeId = this.subtypeId ? parseInt(this.subtypeId) : null;
		this.isBlocked = this.isBlocked
			? this.isBlocked.toLowerCase() === "true"
			: false;
		this.isDeleted = this.isDeleted
			? this.isDeleted.toLowerCase() === "true"
			: false;
	}
}

module.exports = User;
