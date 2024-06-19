const FactoryService = require("../services/factoryService");
const ManagerService = require("../services/managerService");
const FactoryCreationService = require("../services/factoryCreationService");
const CreateFactoryDTO = require("../dto/CreateFactoryDTO");

class FactoryController {
	constructor() {
		this.factoryService = new FactoryService();
		this.managerService = new ManagerService();
		this.factoryCreationService = new FactoryCreationService();
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

	async createFactory(req, res) {
		try {
			if (!req.userId || req.role !== "ADMINISTRATOR") {
				return res.status(403).json({ message: "Forbidden: Admins only" });
			}

			console.log("USERNAME" + req.body.username);

			const factory = {
				name: req.body.name,
				workingHours: req.body.workingHours,
				status: req.body.status,
				location: {
					latitude: req.body.latitude,
					longitude: req.body.longitude,
					street: req.body.street,
					city: req.body.city,
					postalCode: req.body.postalCode,
				},
				logo: req.file ? req.file.path : null,
				rating: req.body.rating,
			};

			const selectedManagerId =
				req.body.selectedManagerId === "null"
					? null
					: req.body.selectedManagerId;
			const managerDetails = {
				username: req.body.username,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				gender: req.body.gender,
				birthDate: req.body.birthDate,
			};

			const dto = new CreateFactoryDTO(
				factory,
				selectedManagerId,
				managerDetails
			);
			const newFactory = await this.factoryCreationService.createFactory(dto);
			res.status(201).json(newFactory);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
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
