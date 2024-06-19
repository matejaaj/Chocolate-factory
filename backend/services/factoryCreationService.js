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
}

module.exports = FactoryCreationService;
