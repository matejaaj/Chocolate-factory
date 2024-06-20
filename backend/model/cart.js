class Cart {
	constructor(userId, chocolateId, quantity, factoryId) {
		this.id = null;
		this.userId = userId;
		this.chocolateId = chocolateId;
		this.quantity = quantity;
		this.factoryId = factoryId;
	}

	toCSV() {
		return [
			this.id,
			this.userId,
			this.chocolateId,
			this.quantity,
			this.factoryId,
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.userId,
			this.chocolateId,
			this.quantity,
			this.factoryId,
		] = values;
		this.id = parseInt(this.id);
		this.quantity = parseInt(this.quantity);
	}
}

module.exports = Cart;
