class Order {
	constructor(userId, totalPrice, chocolateIds, date, status, factoryId) {
		this.id = null;
		this.userId = userId;
		this.totalPrice = totalPrice;
		this.chocolateIds = Array.isArray(chocolateIds) ? chocolateIds : [];
		this.date = this.formatDate(date);
		this.status = status;
		this.factoryId = factoryId;
		this.isReviewed = false;
		this.isDeleted = false;
	}

	formatDate(date) {
		try {
			return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
		} catch (error) {
			return new Date().toISOString(); // Fallback to the current date if the date is invalid
		}
	}

	toCSV() {
		return [
			this.id,
			this.userId,
			this.totalPrice,
			this.chocolateIds.join(','), // Ensure it's a list before joining
			this.date,
			this.status,
			this.factoryId,
			this.isReviewed ? "true" : "false",
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.userId,
			this.totalPrice,
			this.chocolateIds,
			this.date,
			this.status,
			this.factoryId,
			this.isReviewed,
			this.isDeleted
		] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
		this.totalPrice = parseFloat(this.totalPrice);
		this.chocolateIds = this.chocolateIds.split(',').map(id => parseInt(id));
		this.date = this.formatDate(this.date);
		this.isReviewed = this.isReviewed === "true";
		this.isDeleted = this.isDeleted === "true";
	}
}

module.exports = Order;
