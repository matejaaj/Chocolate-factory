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
		const decoded = jwt.verify(token, "your_secret_key"); // Use the same secret key as in AuthService
		req.userId = decoded.id;
		req.role = decoded.role;
		console.log("Token decoded and req.userId set:", req.userId); // Debug log
		next();
	} catch (err) {
		console.log("Invalid token:", err);
		res.status(400).json({ message: "Invalid token." });
	}
};

module.exports = authenticateToken;
