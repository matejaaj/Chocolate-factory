const path = require("path");
const Serializer = require("../serializer/serializer");
const Manager = require("../model/manager");

class ManagerDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/managers.csv");
		this.serializer = new Serializer();
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Manager);
	}

	save(manager) {
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
		this.managers.push(manager);
		this.serializer.toCSV(this.filePath, this.managers);
		return manager;
	}

	nextId() {
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
		if (this.managers.length < 1) {
			return 1;
		}
		return Math.max(...this.managers.map((m) => m.id)) + 1;
	}

	delete(manager) {
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
		const index = this.managers.findIndex((m) => m.id === manager.id);
		if (index !== -1) {
			this.managers.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.managers);
		}
	}

	update(manager) {
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
		const index = this.managers.findIndex((m) => m.id === manager.id);
		if (index !== -1) {
			this.managers[index] = manager;
			this.serializer.toCSV(this.filePath, this.managers);
		}
		return manager;
	}

	getById(managerId) {
		this.managers = this.serializer.fromCSV(this.filePath, Manager);
		return this.managers.find((manager) => manager.id === managerId);
	}
}

module.exports = ManagerDAO;
