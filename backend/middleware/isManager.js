const ManagerService = require("../services/managerService");

const isManager = async (req, res, next) => {
	if (req.role !== "MANAGER") {
		return res.status(403).json({ message: "Forbidden: Managers only" });
	}

	try {
		const managerService = new ManagerService();
		const manager = await managerService.getManagerById(req.userId);

		if (!manager) {
			return res.status(404).json({ message: "Manager not found" });
		}

		req.factoryId = manager.factoryId;

		console.log("Factory id set in request: " + req.factoryId);

		next();
	} catch (error) {
		console.error("Error fetching manager:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = isManager;
