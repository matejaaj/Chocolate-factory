// dao/administrator-dao.js
const path = require("path");
const Serializer = require("../serializer/serializer");
const Administrator = require("../models/administrator");

class AdministratorDAO {
	constructor() {
		this.filePath = path.join(
			__dirname,
			"../resources/data/administrators.csv"
		);
		this.serializer = new Serializer();
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Administrator);
	}

	save(administrator) {
		administrator.id = this.nextId();
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
		this.administrators.push(administrator);
		this.serializer.toCSV(this.filePath, this.administrators);
		return administrator;
	}

	nextId() {
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
		if (this.administrators.length < 1) {
			return 1;
		}
		return Math.max(...this.administrators.map((a) => a.id)) + 1;
	}

	delete(administrator) {
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
		const index = this.administrators.findIndex(
			(a) => a.id === administrator.id
		);
		if (index !== -1) {
			this.administrators.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.administrators);
		}
	}

	update(administrator) {
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
		const index = this.administrators.findIndex(
			(a) => a.id === administrator.id
		);
		if (index !== -1) {
			this.administrators[index] = administrator;
			this.serializer.toCSV(this.filePath, this.administrators);
		}
		return administrator;
	}

	getById(administratorId) {
		this.administrators = this.serializer.fromCSV(this.filePath, Administrator);
		return this.administrators.find(
			(administrator) => administrator.id === administratorId
		);
	}
}

module.exports = AdministratorDAO;
