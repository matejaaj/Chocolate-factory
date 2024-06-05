const AdministratorDAO = require("../dao/administratorDAO");
const Administrator = require("../model/administrator");

class AdministratorService {
  constructor() {
    this.administratorDAO = new AdministratorDAO();
  }

  getAllAdministrators() {
    return this.administratorDAO.getAll();
  }

  getAdministratorById(id) {
    return this.administratorDAO.getById(id);
  }

  createAdministrator(data) {
    const newAdministrator = new Administrator(
      data.username,
      data.password,
      data.firstName,
      data.lastName,
      data.gender,
      data.dob,
      data.role
    );
    return this.administratorDAO.save(newAdministrator);
  }

  updateAdministrator(id, data) {
    const existingAdministrator = this.administratorDAO.getById(id);
    if (existingAdministrator) {
      existingAdministrator.username = data.username || existingAdministrator.username;
      existingAdministrator.password = data.password || existingAdministrator.password;
      existingAdministrator.firstName = data.firstName || existingAdministrator.firstName;
      existingAdministrator.lastName = data.lastName || existingAdministrator.lastName;
      existingAdministrator.gender = data.gender || existingAdministrator.gender;
      existingAdministrator.dob = data.dob || existingAdministrator.dob;
      existingAdministrator.role = data.role || existingAdministrator.role;
      return this.administratorDAO.update(existingAdministrator);
    }
    return null;
  }

  deleteAdministrator(id) {
    const existingAdministrator = this.administratorDAO.getById(id);
    if (existingAdministrator) {
      this.administratorDAO.delete(existingAdministrator);
      return true;
    }
    return false;
  }
}

module.exports = AdministratorService;
