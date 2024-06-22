const ManagerService = require("../services/managerService");

const isUserManagerofFactory = async (req, res, next) => {
	const managerService = new ManagerService();

	if (!req.userId) {
		return res.status(403).json({ message: "Unauthorized access" });
	}

	const factoryId = parseInt(req.body.factoryId);

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
