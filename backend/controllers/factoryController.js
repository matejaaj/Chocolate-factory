const FactoryService = require("../services/factoryService");
const ManagerService = require("../services/managerService");

class FactoryController {
	constructor() {
		this.factoryService = new FactoryService();
		this.managerService = new ManagerService();
	}

	getAllFactories(req, res) {
		const factories = this.factoryService.getAllFactories();
		res.json(factories);
	}

	async isUserManager(req, res) {
		if (!req.userId) {
			return res.status(500).json({ message: "Unauthorized access" });
		}

		const factoryId = parseInt(req.params.factoryId, 10);
		console.log("userid", req.userId);
		console.log("role", req.role);

		if (req.role === "MANAGER") {
			const manager = await this.managerService.getManagerById(req.userId);
			if (manager && manager.factoryId === factoryId) {
				return res.json({ isManager: true });
			}
		}

		return res.json({ isManager: false });
	}
	async getFactoryById(req, res) {
		const factoryId = parseInt(req.params.id, 10);
		const factory = await this.factoryService.getFactoryById(factoryId);
		if (factory) {
			res.json(factory);
		} else {
			res.status(404).json({ message: "Factory not found" });
		}
	}

	createFactory(req, res) {
		const newFactory = this.factoryService.createFactory(req.body);
		res.status(201).json(newFactory);
	}

	updateFactory(req, res) {
		const updatedFactory = this.factoryService.updateFactory(
			req.params.id,
			req.body
		);
		if (updatedFactory) {
			res.json(updatedFactory);
		} else {
			res.status(404).json({ message: "Factory not found" });
		}
	}

	deleteFactory(req, res) {
		const success = this.factoryService.deleteFactory(req.params.id);
		if (success) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Factory not found" });
		}
	}
}

module.exports = FactoryController;
