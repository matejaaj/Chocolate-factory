const ManagerDAO = require("../dao/managerDAO");
const Manager = require("../model/manager");

class ManagerService {
  constructor() {
    this.managerDAO = new ManagerDAO();
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
}

module.exports = ManagerService;
