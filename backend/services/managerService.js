const ManagerDAO = require("../dao/managerDAO");
const Manager = require("../model/manager");
const UserDAO = require("../dao/userDAO"); // Import UserDAO

class ManagerService {
	constructor() {
		this.managerDAO = new ManagerDAO();
		this.userDAO = new UserDAO(); // Initialize UserDAO
	}

	getAllManagers() {
		return this.managerDAO.getAll();
	}

	getManagerById(id) {
		return this.managerDAO.getById(id);
	}

	createManager(data) {
		const newManager = new Manager(
			data.username,
			data.password,
			data.firstName,
			data.lastName,
			data.gender,
			data.dob,
			data.factory
		);
		return this.managerDAO.save(newManager);
	}

	updateManager(id, data) {
		const existingManager = this.managerDAO.getById(id);
		if (existingManager) {
			existingManager.username = data.username || existingManager.username;
			existingManager.password = data.password || existingManager.password;
			existingManager.firstName = data.firstName || existingManager.firstName;
			existingManager.lastName = data.lastName || existingManager.lastName;
			existingManager.gender = data.gender || existingManager.gender;
			existingManager.dob = data.dob || existingManager.dob;
			existingManager.factory = data.factory || existingManager.factory;
			return this.managerDAO.update(existingManager);
		}
		return null;
	}

	deleteManager(id) {
		const existingManager = this.managerDAO.getById(id);
		if (existingManager) {
			this.managerDAO.delete(existingManager);
			return true;
		}
		return false;
	}

	getAvailableManagers() {
		const allManagers = this.managerDAO.getAll();
		const allUsers = this.userDAO.getAll();
		const availableManagers = allManagers
			.filter((manager) => manager.factoryId === -1)
			.map((manager) => {
				const user = allUsers.find(
					(user) => user.id === manager.id && !user.isDeleted
				);
				return user
					? { id: user.id, firstName: user.firstName, lastName: user.lastName }
					: null;
			})
			.filter((manager) => manager !== null);
		return availableManagers;
	}
}

module.exports = ManagerService;
