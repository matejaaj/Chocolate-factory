const LocationDAO = require("../dao/locationDAO");
const Location = require("../model/location");

class LocationService {
	constructor() {
		this.locationDAO = new LocationDAO();
	}

	getAllLocations() {
		return this.locationDAO.getAll();
	}

	getLocationById(id) {
		return this.locationDAO.getById(id);
	}

	createLocation(data) {
		const newLocation = new Location(
			data.latitude,
			data.longitude,
			data.street,
			data.city,
			data.postalCode
		);
		return this.locationDAO.save(newLocation);
	}

	updateLocation(id, data) {
		const existingLocation = this.locationDAO.getById(id);
		if (existingLocation) {
			existingLocation.name = data.name || existingLocation.name;
			existingLocation.address = data.address || existingLocation.address;
			existingLocation.city = data.city || existingLocation.city;
			existingLocation.state = data.state || existingLocation.state;
			existingLocation.zipCode = data.zipCode || existingLocation.zipCode;
			return this.locationDAO.update(existingLocation);
		}
		return null;
	}

	deleteLocation(id) {
		const existingLocation = this.locationDAO.getById(id);
		if (existingLocation) {
			this.locationDAO.delete(existingLocation);
			return true;
		}
		return false;
	}
}

module.exports = LocationService;
