const UserService = require("./userService");

class AuthService {
	constructor() {
		this.userService = new UserService();
	}

	login(username, password) {
		const user = this.userService.getUserByUsername(username);
		if (user && user.password === password) {
			return {
				id: user.id,
				role: user.role,
			};
		}
		return null;
	}
}

module.exports = AuthService;
