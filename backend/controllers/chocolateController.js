const ChocolateService = require("../services/chocolateService");

class ChocolateController {
	constructor() {
		this.chocolateService = new ChocolateService();
	}

	getAllChocolates(req, res) {
		const chocolates = this.chocolateService.getAllChocolates();
		res.json(chocolates);
	}

	getChocolateById(req, res) {
		const chocolate = this.chocolateService.getChocolateById(req.params.id);
		if (chocolate) {
			res.json(chocolate);
		} else {
			res.status(404).json({ message: "Chocolate not found" });
		}
	}

	getChocolatesByFactory(req, res) {
		const factoryId = parseInt(req.query.factoryId);
		const chocolates = this.chocolateService.getChocolatesByFactory(factoryId);
		res.json(chocolates);
	}

	createChocolate(req, res) {
		const newChocolate = this.chocolateService.createChocolate(req.body);
		res.status(201).json(newChocolate);
	}

	updateChocolate(req, res) {
		const updatedChocolate = this.chocolateService.updateChocolate(
			req.params.id,
			req.body
		);
		if (updatedChocolate) {
			res.json(updatedChocolate);
		} else {
			res.status(404).json({ message: "Chocolate not found" });
		}
	}

	deleteChocolate(req, res) {
		const success = this.chocolateService.deleteChocolate(req.params.id);
		if (success) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Chocolate not found" });
		}
	}
	async updateChocolateQuantity(req, res) {
		const { chocolateId, quantity } = req.body;
		const factoryId = req.body.factoryId;

		try {
			const updatedChocolate =
				await this.chocolateService.updateChocolateQuantity(
					chocolateId,
					quantity,
					factoryId
				);
			res.json(updatedChocolate);
		} catch (error) {
			console.error("Error updating chocolate quantity:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

module.exports = ChocolateController;
