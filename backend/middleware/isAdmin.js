const isAdmin = (req, res, next) => {
	if (req.role !== "ADMINISTRATOR") {
		return res.status(403).json({ message: "Forbidden: Admins only" });
	}
	next();
};

module.exports = isAdmin;
