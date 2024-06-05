const path = require("path");
const Serializer = require("../serializer/serializer");
const Location = require("../model/location");

class LocationDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/locations.csv");
		this.serializer = new Serializer();
		this.locations = this.serializer.fromCSV(this.filePath, Location);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Location);
	}

	save(location) {
		location.id = this.nextId();
		this.locations = this.serializer.fromCSV(this.filePath, Location);
		this.locations.push(location);
		this.serializer.toCSV(this.filePath, this.locations);
		return location;
	}

	nextId() {
		this.locations = this.serializer.fromCSV(this.filePath, Location);
		if (this.locations.length < 1) {
			return 1;
		}
		return Math.max(...this.locations.map((l) => l.id)) + 1;
	}

	delete(location) {
		this.locations = this.serializer.fromCSV(this.filePath, Location);
		const index = this.locations.findIndex((l) => l.id === location.id);
		if (index !== -1) {
			this.locations.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.locations);
		}
	}

	update(location) {
		this.locations = this.serializer.fromCSV(this.filePath, Location);
		const index = this.locations.findIndex((l) => l.id === location.id);
		if (index !== -1) {
			this.locations[index] = location;
			this.serializer.toCSV(this.filePath, this.locations);
		}
		return location;
	}

	getById(locationId) {
		this.locations = this.serializer.fromCSV(this.filePath, Location);
		return this.locations.find((location) => location.id === locationId);
	}
}

module.exports = LocationDAO;
