class Factory {
	constructor(name, workingHours, status, locationId, logo, rating) {
		this.id = null;
		this.name = name;
		this.workingHours = workingHours;
		this.status = status;
		this.locationId = locationId;
		this.logo = logo;
		this.rating = rating;
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
		] = values;
	}
}

module.exports = Factory;
