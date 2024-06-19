const UserDAO = require("../dao/userDAO");
const ManagerDAO = require("../dao/managerDAO");
const User = require("../model/user");

class UserService {
	constructor() {
		this.userDAO = new UserDAO();
	}

	async createUser(data) {
		const existingUser = this.userDAO.findByUsername(data.username);
		if (existingUser) {
			throw new Error("Username already exists");
		}

		const newUser = new User(
			data.username,
			data.password,
			data.firstName,
			data.lastName,
			data.gender,
			data.birthDate,
			data.role
		);

		const savedUser = this.userDAO.save(newUser);
		return savedUser;
	}

	getUserByUsername(username) {
		return this.userDAO.findByUsername(username);
	}

	getUserById(userId) {
		return this.userDAO.getById(userId);
	}
}

module.exports = UserService;
