const path = require("path");
const Serializer = require("../serializer/serializer");
const Cancellation = require("../model/cancellation");

class CancellationDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/cancellations.csv");
		this.serializer = new Serializer();
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
	}

	getAll() {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		return this.cancellations.filter((cancellation) => !cancellation.isDeleted);
	}

	save(cancellation) {
		cancellation.id = this.nextId();
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		this.cancellations.push(cancellation);
		this.serializer.toCSV(this.filePath, this.cancellations);
		return cancellation;
	}

	getByUserId(userId) {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		return this.cancellations.filter(cancellation => cancellation.userId == userId && !cancellation.isDeleted);
	}

	getById(cancellationId) {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		return this.cancellations.find(cancellation => cancellation.id == cancellationId && !cancellation.isDeleted);
	}

	nextId() {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		if (this.cancellations.length < 1) {
			return 1;
		}
		return Math.max(...this.cancellations.map((cancellation) => cancellation.id)) + 1;
	}

	update(cancellation) {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		const index = this.cancellations.findIndex((c) => c.id === cancellation.id);
		if (index !== -1) {
			this.cancellations[index] = cancellation;
			this.serializer.toCSV(this.filePath, this.cancellations);
		}
		return cancellation;
	}

	delete(cancellation) {
		this.cancellations = this.serializer.fromCSV(this.filePath, Cancellation);
		const index = this.cancellations.findIndex((c) => c.id === cancellation.id);
		if (index !== -1) {
			this.cancellations[index].isDeleted = true;
			this.serializer.toCSV(this.filePath, this.cancellations);
		}
	}
}

module.exports = CancellationDAO;
