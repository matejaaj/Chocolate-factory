const AuthService = require("../services/authService");

class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	login(req, res) {
		const { username, password } = req.body;
		console.log("Login attempt with username:", username); // Debug log
		const result = this.authService.login(username, password);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	}
}

module.exports = AuthController;
