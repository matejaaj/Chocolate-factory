const AdministratorService = require("../services/administratorService");

class AdministratorController {
  constructor() {
    this.administratorService = new AdministratorService();
  }

  getAllAdministrators(req, res) {
    const administrators = this.administratorService.getAllAdministrators();
    res.json(administrators);
  }

  getAdministratorById(req, res) {
    const administrator = this.administratorService.getAdministratorById(req.params.id);
    if (administrator) {
      res.json(administrator);
    } else {
      res.status(404).json({ message: "Administrator not found" });
    }
  }

  createAdministrator(req, res) {
    const newAdministrator = this.administratorService.createAdministrator(req.body);
    res.status(201).json(newAdministrator);
  }

  updateAdministrator(req, res) {
    const updatedAdministrator = this.administratorService.updateAdministrator(req.params.id, req.body);
    if (updatedAdministrator) {
      res.json(updatedAdministrator);
    } else {
      res.status(404).json({ message: "Administrator not found" });
    }
  }

  deleteAdministrator(req, res) {
    const success = this.administratorService.deleteAdministrator(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Administrator not found" });
    }
  }
}

module.exports = AdministratorController;
