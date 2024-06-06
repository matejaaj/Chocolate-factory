const path = require("path");
const Serializer = require("../serializer/serializer");
const Factory = require("../model/factory");

class FactoryDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/factories.csv");
		this.serializer = new Serializer();
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Factory);
	}

	save(factory) {
		factory.id = this.nextId();
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
		this.factories.push(factory);
		this.serializer.toCSV(this.filePath, this.factories);
		return factory;
	}

	nextId() {
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
		if (this.factories.length < 1) {
			return 1;
		}
		return Math.max(...this.factories.map((f) => f.id)) + 1;
	}

	delete(factory) {
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
		const index = this.factories.findIndex((f) => f.id === factory.id);
		if (index !== -1) {
			this.factories.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.factories);
		}
	}

	update(factory) {
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
		const index = this.factories.findIndex((f) => f.id === factory.id);
		if (index !== -1) {
			this.factories[index] = factory;
			this.serializer.toCSV(this.filePath, this.factories);
		}
		return factory;
	}

	getById(factoryId) {
		this.factories = this.serializer.fromCSV(this.filePath, Factory);
		return this.factories.find((factory) => factory.id === factoryId);
	}
}

module.exports = FactoryDAO;
