class Factory {
	constructor(name, workingHours, status, locationId, logo, rating) {
		this.id = null;
		this.name = name;
		this.workingHours = workingHours;
		this.status = status;
		this.locationId = locationId;
		this.logo = logo;
		this.rating = rating;
		this.isDeleted = false;
	}

	toCSV() {
		return [
			this.id,
			this.name,
			this.workingHours,
			this.status,
			this.locationId,
			this.logo,
			this.rating,
			this.isDeleted ? "true" : "false",
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.name,
			this.workingHours,
			this.status,
			this.locationId,
			this.logo,
			this.rating,
			this.isDeleted,
		] = values;
		this.id = parseInt(this.id);
		this.isDeleted = this.isDeleted
			? this.isDeleted.toLowerCase() === "true"
			: false;
	}
}

module.exports = Factory;
