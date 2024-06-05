class Chocolate {
	constructor(
		name,
		price,
		type,
		factoryId,
		category,
		weight,
		description,
		image,
		status,
		quantity
	) {
		this.id = null; // ID će biti serijalizovan i deserijalizovan, ali ne postavljan u konstruktoru
		this.name = name;
		this.price = price;
		this.type = type;
		this.factoryId = factoryId;
		this.category = category;
		this.weight = weight;
		this.description = description;
		this.image = image;
		this.status = status;
		this.quantity = quantity;
	}

	toCSV() {
		return [
			this.id,
			this.name,
			this.price,
			this.type,
			this.factoryId,
			this.category,
			this.weight,
			this.description,
			this.image,
			this.status,
			this.quantity,
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.name,
			this.price,
			this.type,
			this.factoryId,
			this.category,
			this.weight,
			this.description,
			this.image,
			this.status,
			this.quantity,
		] = values;
	}
}

module.exports = Chocolate;
