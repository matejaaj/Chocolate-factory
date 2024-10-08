const jwt = require("jsonwebtoken");
const AuthService = require("../services/authService");

class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	login(req, res) {
		const { username, password } = req.body;
		console.log("Login attempt with username:", username);
		try {
			const result = this.authService.login(username, password);
			if (result && !result.error) {
				res.cookie("token", result.token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
					maxAge: 3600000, // 1 hour
				});
				res.status(200).json(result.user);
			} else if (result && result.error) {
				res.status(403).json({ message: result.error });
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		} catch (err) {
			console.error("Error during login:", err);
			res
				.status(500)
				.json({ message: "An error occurred. Please try again later." });
		}
	}

	logout(req, res) {
		res.clearCookie("token");
		res.status(200).json({ message: "Logged out successfully" });
	}

	checkAuth(req, res) {
		const token = req.cookies.token;
		if (!token) {
			return res.status(200).json({ isAuthenticated: false });
		}

		try {
			const decoded = jwt.verify(token, "your_secret_key");
			res.status(200).json({ isAuthenticated: true, user: decoded });
		} catch (err) {
			res.status(200).json({ isAuthenticated: false });
		}
	}

	async register(req, res) {
		const {
			username,
			password,
			confirmPassword,
			firstName,
			lastName,
			gender,
			birthDate,
		} = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		try {
			const result = await this.authService.register({
				username,
				password,
				firstName,
				lastName,
				gender,
				birthDate,
			});
			if (result) {
				res.status(201).json({ message: "Registration successful" });
			} else {
				res
					.status(400)
					.json({ message: "Registration failed. User might already exist." });
			}
		} catch (err) {
			console.error("Error during registration:", err); // Log the error
			res.status(400).json({ message: err.message });
		}
	}

	async registerEmployee(req, res) {
		const {
			username,
			password,
			confirmPassword,
			firstName,
			lastName,
			gender,
			birthDate,
		} = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		try {
			const result = await this.authService.registerEmployee({
				username,
				password,
				firstName,
				lastName,
				gender,
				birthDate,
				factoryId: req.factoryId,
			});
			if (result) {
				res.status(201).json({ message: "Registration successful" });
			} else {
				res
					.status(400)
					.json({ message: "Registration failed. User might already exist." });
			}
		} catch (err) {
			console.error("Error during registration:", err); // Log the error
			res.status(400).json({ message: err.message });
		}
	}

	getRole(req, res) {
		const token = req.cookies.token;
		if (!token) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		try {
			const decoded = jwt.verify(token, "your_secret_key");
			res.status(200).json({ role: decoded.role });
		} catch (err) {
			res.status(401).json({ message: "Invalid token" });
		}
	}
}

module.exports = AuthController;
