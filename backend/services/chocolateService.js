const ChocolateDAO = require("../dao/chocolateDAO");
const Chocolate = require("../model/chocolate");

class ChocolateService {
	constructor() {
		this.chocolateDAO = new ChocolateDAO();
	}

	getAllChocolates() {
		return this.chocolateDAO.getAll();
	}

	getChocolateById(id) {
		return this.chocolateDAO.getById(id);
	}

	createChocolate(data) {
		const newChocolate = new Chocolate(
			data.name,
			data.price,
			data.type,
			data.factoryId,
			data.category,
			data.weight,
			data.description,
			data.image,
			data.status,
			0
		);
		return this.chocolateDAO.save(newChocolate);
	}

	updateChocolate(id, data) {
		const existingChocolate = this.chocolateDAO.getById(id);
		if (existingChocolate) {
			existingChocolate.name = data.name || existingChocolate.name;
			existingChocolate.type = data.type || existingChocolate.type;
			existingChocolate.manufacturer =
				data.manufacturer || existingChocolate.manufacturer;
			existingChocolate.price = data.price || existingChocolate.price;
			existingChocolate.expiryDate =
				data.expiryDate || existingChocolate.expiryDate;
			existingChocolate.quantity = data.quantity || existingChocolate.quantity;
			return this.chocolateDAO.update(existingChocolate);
		}
		return null;
	}

	deleteChocolate(id) {
		const existingChocolate = this.chocolateDAO.getById(id);
		if (existingChocolate) {
			this.chocolateDAO.delete(existingChocolate);
			return true;
		}
		return false;
	}

	getChocolatesByFactory(factoryId) {
		const chocolates = this.chocolateDAO.getAll();
		return chocolates.filter((chocolate) => chocolate.factoryId == factoryId);
	}

	async updateChocolateQuantity(chocolateId, quantity, factoryId) {
		const chocolate = await this.chocolateDAO.getById(chocolateId);

		chocolate.quantity = quantity;
		return this.chocolateDAO.update(chocolate);
	}
}

module.exports = ChocolateService;
