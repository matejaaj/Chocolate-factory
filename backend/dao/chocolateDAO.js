const path = require("path");
const Serializer = require("../serializer/serializer");
const Chocolate = require("../model/chocolate");

class ChocolateDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/chocolates.csv");
		this.serializer = new Serializer();
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
	}

	getAll() {
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		return this.chocolates.filter((chocolate) => !chocolate.isDeleted);
	}

	save(chocolate) {
		chocolate.id = this.nextId();
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		this.chocolates.push(chocolate);
		this.serializer.toCSV(this.filePath, this.chocolates);
		return chocolate;
	}

	nextId() {
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		if (this.chocolates.length < 1) {
			return 1;
		}
		return Math.max(...this.chocolates.map((c) => c.id)) + 1;
	}

	delete(chocolate) {
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		const index = this.chocolates.findIndex((c) => c.id == chocolate.id);
		if (index !== -1) {
			this.chocolates[index].isDeleted = true;
			this.serializer.toCSV(this.filePath, this.chocolates);
		}
	}

	update(chocolate) {
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		const index = this.chocolates.findIndex((c) => c.id === chocolate.id);
		if (index !== -1) {
			this.chocolates[index] = chocolate;
			this.serializer.toCSV(this.filePath, this.chocolates);
		}
		return chocolate;
	}

	getById(chocolateId) {
		this.chocolates = this.serializer.fromCSV(this.filePath, Chocolate);
		return this.chocolates.find(
			(chocolate) => chocolate.id == chocolateId && !chocolate.isDeleted
		);
	}
}

module.exports = ChocolateDAO;
