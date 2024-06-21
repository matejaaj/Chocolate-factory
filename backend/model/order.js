class Order {
	constructor(userId, totalPrice, cartItemIds, date, status) {
		this.id = null;
		this.userId = userId;
		this.totalPrice = totalPrice;
		this.cartItemIds = Array.isArray(cartItemIds) ? cartItemIds : [];
		this.date = this.formatDate(date);
		this.status = status;
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
			this.cartItemIds.join(','), // Ensure it's a list before joining
			this.date,
			this.status,
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.userId,
			this.totalPrice,
			this.cartItemIds,
			this.date,
			this.status,
			this.isDeleted
		] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
		this.totalPrice = parseFloat(this.totalPrice);
		this.cartItemIds = this.cartItemIds.split(',').map(id => parseInt(id));
		this.date = this.formatDate(this.date);
		this.isDeleted = this.isDeleted === "true";
	}
}

module.exports = Order;
