const UserDAO = require("../dao/userDAO");

class UserService {
	constructor() {
		this.userDAO = new UserDAO();
	}

	getAllUsers() {
		return this.userDAO.getAll();
	}

	saveUser(user) {
		return this.userDAO.save(user);
	}

	updateUser(user) {
		return this.userDAO.update(user);
	}

	deleteUser(user) {
		this.userDAO.delete(user);
	}

	getUserById(userId) {
		return this.userDAO.getById(userId);
	}

	findUserByUsername(username) {
		return this.userDAO.findByUsername(username);
	}

	blockUser(userId) {
		console.log("User to be blocked ID: " + userId);
		const user = this.getUserById(userId);
		if (user && user.role !== "ADMINISTRATOR") {
			user.isBlocked = true;
			return this.userDAO.update(user);
		}
		return null;
	}

	unblockUser(userId) {
		console.log("User to be unblocked ID: " + userId);
		const user = this.getUserById(userId);
		if (user && user.role !== "ADMINISTRATOR") {
			user.isBlocked = false;
			return this.userDAO.update(user);
		}
		return null;
	}
}

module.exports = UserService;
