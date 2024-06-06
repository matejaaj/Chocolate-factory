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
			this.subtypeId,
		] = values;
		this.id = parseInt(this.id);
		this.subtypeId = parseInt(this.subtypeId);
	}
}

module.exports = User;
