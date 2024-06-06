class Employee {
	constructor(userId, id = null) {
		this.userId = userId; // Reference to the user ID
		this.id = id; // Add id field
	}

	toCSV() {
		return [this.id, this.userId];
	}

	fromCSV(values) {
		[this.id, this.userId] = values;
		this.id = parseInt(this.id);
		this.userId = parseInt(this.userId);
	}
}

module.exports = Employee;
