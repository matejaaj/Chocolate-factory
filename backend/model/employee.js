class Employee {
	constructor(id, factoryId) {
		this.id = id;
		this.factoryId = factoryId;
	}

	toCSV() {
		return [this.id, this.factoryId];
	}

	fromCSV(values) {
		[this.id, this.factoryId] = values;
		this.id = parseInt(this.id);
		this.factoryId = parseInt(this.factoryId);
	}
}

module.exports = Employee;
