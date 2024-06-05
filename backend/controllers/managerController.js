const ManagerService = require("../services/managerService");

class ManagerController {
  constructor() {
    this.managerService = new ManagerService();
  }

  getAllManagers(req, res) {
    const managers = this.managerService.getAllManagers();
    res.json(managers);
  }

  getManagerById(req, res) {
    const manager = this.managerService.getManagerById(req.params.id);
    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  }

  createManager(req, res) {
    const newManager = this.managerService.createManager(req.body);
    res.status(201).json(newManager);
  }

  updateManager(req, res) {
    const updatedManager = this.managerService.updateManager(req.params.id, req.body);
    if (updatedManager) {
      res.json(updatedManager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  }

  deleteManager(req, res) {
    const success = this.managerService.deleteManager(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  }
}

module.exports = ManagerController;
