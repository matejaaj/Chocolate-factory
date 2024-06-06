class Location {
	constructor(latitude, longitude, street, city, postalCode) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.street = street;
		this.city = city;
		this.postalCode = postalCode;
	}

	toCSV() {
		return [
			this.id,
			this.latitude,
			this.longitude,
			this.street,
			this.city,
			this.postalCode,
		];
	}

	fromCSV(values) {
		[
			this.id,
			this.latitude,
			this.longitude,
			this.street,
			this.city,
			this.postalCode,
		] = values;
		this.id = parseInt(this.id);
	}
}

module.exports = Location;
