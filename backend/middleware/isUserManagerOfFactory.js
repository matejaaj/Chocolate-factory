const ManagerService = require("../services/managerService");

const isUserManagerofFactory = async (req, res, next) => {
	const managerService = new ManagerService();

	if (!req.userId) {
		return res.status(403).json({ message: "Unauthorized access" });
	}

	const factoryId = parseInt(req.body.factoryId);
	// if (!factoryId) {
	// 	return res.status(400).json({ message: "Factory ID is required" });
	// }
	console.log("FACTORY: " + factoryId);
	// const factoryId =
	// 	parseInt(req.body.factoryId) ||
	// 	parseInt(req.query.factoryId) ||
	// 	parseInt(req.params.factoryId);
	// console.log("FACTORY: " + factoryId);
	// console.log("USER: " + req.userId);

	if (req.role === "MANAGER") {
		const manager = await managerService.getManagerById(req.userId);
		if (manager && manager.factoryId === factoryId) {
			req.isManager = true;
			return next();
		}
	}

	req.isManager = false;
	res.status(403).json({ message: "Forbidden: Not a manager of this factory" });
};

module.exports = isUserManagerofFactory;
