const jwt = require("jsonwebtoken");
const UserService = require("./userService");

class AuthService {
	constructor() {
		this.userService = new UserService();
	}

	login(username, password) {
		const user = this.userService.getUserByUsername(username);
		if (user && user.password === password) {
			const token = jwt.sign(
				{ id: user.id, username: user.username, role: user.role },
				"your_secret_key",
				{ expiresIn: "1h" } // Token expires in 1 hour
			);
			return {
				token,
				user: { id: user.id, username: user.username, role: user.role },
			};
		}
		return null;
	}

	verifyToken(token) {
		try {
			return jwt.verify(token, "your_secret_key");
		} catch (error) {
			return null;
		}
	}
}

module.exports = AuthService;
