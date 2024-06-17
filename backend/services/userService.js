const UserDAO = require("../dao/userDAO");
const ManagerDAO = require("../dao/managerDAO");

class UserService {
	constructor() {
		this.userDAO = new UserDAO();
	}

	getUserByUsername(username) {
		return this.userDAO.findByUsername(username);
	}

	getUserById(userId) {
		return this.userDAO.getById(userId);
	}
}

module.exports = UserService;
