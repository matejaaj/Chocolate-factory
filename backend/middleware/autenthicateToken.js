const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		console.log("No token provided");
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, "your_secret_key");
		req.userId = decoded.id;
		req.role = decoded.role;
		req.isBlocked = decoded.isBlocked;

		console.log("Decoded JWT:", decoded); // Dodavanje loga za decoded objekat

		if (req.isBlocked) {
			console.log("USER BLOCKED");
			return res.status(403).json({ message: "Forbidden: User is blocked" });
		}

		console.log("Token decoded and username set:", decoded.username); // Logovanje req.userId
		next();
	} catch (err) {
		console.log("Invalid token:", err.message);
		res.status(400).json({ message: "Invalid token." });
	}
};

module.exports = authenticateToken;
