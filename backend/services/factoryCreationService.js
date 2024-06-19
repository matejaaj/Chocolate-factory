const FactoryService = require("./factoryService");
const LocationService = require("./locationService");
const UserService = require("./userService");
const ManagerService = require("./managerService");

class FactoryCreationService {
	constructor() {
		this.factoryService = new FactoryService();
		this.locationService = new LocationService();
		this.userService = new UserService();
		this.managerService = new ManagerService();
	}

	async createFactory(dto) {
		console.log(dto);
		try {
			this._validateFactoryDetails(dto);
			const location = await this._createLocation(dto.factory.location);
			const factory = await this._createFactory(dto.factory, location.id);
			const managerId = await this._getOrCreateManager(dto, factory.id);

			return factory;
		} catch (error) {
			console.error("Error in createFactory:", error);
			throw error;
		}
	}

	async _createLocation(locationData) {
		if (!locationData) {
			throw new Error("Location data is missing.");
		}

		const { latitude, longitude, street, city, postalCode } = locationData;
		return this.locationService.createLocation({
			latitude,
			longitude,
			street,
			city,
			postalCode,
		});
	}

	async _createFactory(factoryData, locationId) {
		const { name, workingHours, status, logo, rating } = factoryData;
		return this.factoryService.createFactory({
			name,
			workingHours,
			status,
			locationId,
			logo,
			rating,
		});
	}

	async _getOrCreateManager(dto, factoryId) {
		if (dto.selectedManagerId) {
			const manager = await this.managerService.getManagerById(
				dto.selectedManagerId
			);

			if (manager.factoryId === -1) {
				manager.factoryId = factoryId;
				await this.managerService.updateManager(dto.selectedManagerId, manager);
			}

			return manager.id;
		}

		const user = await this._createUser(dto.managerDetails);
		const manager = await this.managerService.createManager({
			userId: user.id,
			factoryId,
		});

		return manager.id;
	}

	async _createUser(managerDetails) {
		this._validateUserDetails(managerDetails);

		const { username, password, firstName, lastName, gender, birthDate } =
			managerDetails;
		return this.userService.createUser({
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			role: "MANAGER",
		});
	}

	_validateUserDetails(userDetails) {
		const { username, firstName, lastName, gender, birthDate } = userDetails;

		if (!/^[a-zA-Z0-9]{1,15}$/.test(username)) {
			throw new Error(
				"Username must be alphanumeric and max length of 15 characters."
			);
		}

		if (!/^[a-zA-Z]{1,20}$/.test(firstName)) {
			throw new Error(
				"First name must contain only letters and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z]{1,20}$/.test(lastName)) {
			throw new Error(
				"Last name must contain only letters and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z]{1,10}$/.test(gender)) {
			throw new Error(
				"Gender must contain only letters and max length of 10 characters."
			);
		}

		if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
			throw new Error("Birth date must be in the format YYYY-MM-DD.");
		}
	}

	_validateFactoryDetails(dto) {
		const {
			factory,
			factory: { location },
		} = dto;

		if (!/^[a-zA-Z]{1,20}$/.test(factory.name)) {
			throw new Error(
				"Factory name must contain only letters and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z0-9\s]{1,20}$/.test(location.city)) {
			throw new Error(
				"City must be alphanumeric and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z0-9\s]{1,20}$/.test(location.street)) {
			throw new Error(
				"Street must be alphanumeric and max length of 20 characters."
			);
		}

		if (!/^\d{1,10}$/.test(location.postalCode)) {
			throw new Error(
				"Postal code must contain only numbers and max length of 10 characters."
			);
		}
	}
}

module.exports = FactoryCreationService;
