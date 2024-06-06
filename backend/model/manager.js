class Manager {
	constructor(id, factoryId) {
		this.factoryId = factoryId;
		this.id = id; // Add id field
	}

	toCSV() {
		return [this.id, this.userId, this.factoryId];
	}

	fromCSV(values) {
		[this.id, this.factoryId] = values;
		this.id = parseInt(this.id);
		this.factoryId = parseInt(this.factoryId);
	}
}

module.exports = Manager;
