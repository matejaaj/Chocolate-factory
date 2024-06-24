class Cancellation {
	constructor(userId, orderId, cancellationDate) {
		this.id = null;
		this.userId = userId;
		this.orderId = orderId;
		this.cancellationDate = new Date(cancellationDate);
		this.isDeleted = false;
	}

	toCSV() {
		return [
			this.id,
			this.userId,
			this.orderId,
			this.cancellationDate.toISOString(),
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.userId,
			this.orderId,
			this.cancellationDate,
			this.isDeleted
		] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
		this.orderId = parseInt(this.orderId);
		this.cancellationDate = new Date(this.cancellationDate);
		this.isDeleted = this.isDeleted.toLowerCase() === "true";
	}
}

module.exports = Cancellation;
