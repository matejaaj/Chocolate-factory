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

	async createChocolate(req, res) {
		try {
			const chocolate = {
				name: req.body.name,
				price: req.body.price,
				type: req.body.type,
				factoryId: req.body.factoryId,
				category: req.body.category,
				weight: req.body.weight,
				description: req.body.description,
				image: req.file ? req.file.path : null,
				status: req.body.status,
				quantity: 0,
			};

			const newChocolate = await this.chocolateService.createChocolate(
				chocolate
			);
			res.status(201).json(newChocolate);
		} catch (error) {
			res.status(500).json({ message: "Error creating chocolate." });
		}
	}

	async updateChocolate(req, res) {
		try {
			const chocolate = {
				name: req.body.name,
				price: req.body.price,
				type: req.body.type,
				factoryId: parseInt(req.body.factoryId), // Ensure factoryId is parsed as an integer
				category: req.body.category,
				weight: req.body.weight,
				description: req.body.description,
				image: req.file ? req.file.path : req.body.image, // Use new image if provided, otherwise keep the existing one
				status: req.body.status,
				quantity: req.body.quantity,
			};

			const updatedChocolate = await this.chocolateService.updateChocolate(
				req.params.id,
				chocolate
			);
			if (updatedChocolate) {
				res.json(updatedChocolate);
			} else {
				res.status(404).json({ message: "Chocolate not found" });
			}
		} catch (error) {
			res.status(500).json({ message: "Error updating chocolate." });
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
