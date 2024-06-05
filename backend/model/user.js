class User {
	constructor(
		username,
		password,
		firstName,
		lastName,
		gender,
		birthDate,
		role
	) {
		this.id = null;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
	}
}

module.exports = User;
