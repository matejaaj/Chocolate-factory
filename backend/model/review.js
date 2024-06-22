class Review {
	constructor(factoryId, userId, text, grade, status) {
		this.id = null;
		this.factoryId = factoryId;
		this.userId = userId;
		this.text = text;
		this.grade = grade; // 1 to 5
		this.status = status; // "pending", "approved", "rejected"
		this.isDeleted = false;
	}

	toCSV() {
		return [
			this.id,
			this.factoryId,
			this.userId,
			this.text,
			this.grade,
			this.status,
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.factoryId,
			this.userId,
			this.text,
			this.grade,
			this.status,
			this.isDeleted,
		] = values;
		this.id = parseInt(this.id);
		this.grade = parseInt(this.grade);
		this.isDeleted = this.isDeleted.toLowerCase() === "true";
	}
}

module.exports = Review;
