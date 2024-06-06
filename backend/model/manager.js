class Manager {
	constructor(userId, factoryId, id = null) {
		this.userId = userId; // Reference to the user ID
		this.factoryId = factoryId;
		this.id = id; // Add id field
	}

	toCSV() {
		return [this.id, this.userId, this.factoryId];
	}

	fromCSV(values) {
		[this.id, this.userId, this.factoryId] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
		this.factoryId = parseInt(this.factoryId);
	}
}

module.exports = Manager;
