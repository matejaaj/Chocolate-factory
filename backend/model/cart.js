class Cart {
	constructor(userId, chocolateId, quantity, factoryId) {
		this.id = null;
		this.userId = userId;
		this.chocolateId = chocolateId;
		this.quantity = quantity;
		this.factoryId = factoryId;
		this.isDeleted = false; // Add isDeleted property
	}

	toCSV() {
		return [
			this.id,
			this.userId,
			this.chocolateId,
			this.quantity,
			this.factoryId,
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.userId,
			this.chocolateId,
			this.quantity,
			this.factoryId,
			this.isDeleted,
		] = values;
		this.id = parseInt(this.id);
		this.quantity = parseInt(this.quantity);
		this.isDeleted = this.isDeleted ? this.isDeleted.toLowerCase() === "true" : false;
	}
}

module.exports = Cart;
