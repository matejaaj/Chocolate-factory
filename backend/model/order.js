class Order {
	constructor(totalPrice, cartItemIds, purchaseDate, status, userId) {
		this.id = null;
		this.totalPrice = totalPrice;
		this.cartItemIds = cartItemIds || [];
		this.purchaseDate = purchaseDate;
		this.status = status;
		this.userId = userId; 
		this.isDeleted = false; 
	}

	toCSV() {
		return [
			this.id,
			this.totalPrice,
			this.cartItemIds.join(','), 
			this.purchaseDate,
			this.status,
			this.userId,
			this.isDeleted ? "true" : "false"
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.totalPrice,
			this.cartItemIds,
			this.purchaseDate,
			this.status,
			this.userId,
			this.isDeleted,
		] = values;
		this.id = parseInt(this.id);
		this.totalPrice = parseFloat(this.totalPrice);
		this.cartItemIds = this.cartItemIds.split(',').map(id => parseInt(id));
		this.isDeleted = this.isDeleted ? this.isDeleted.toLowerCase() === "true" : false;
	}
}

module.exports = Order;
