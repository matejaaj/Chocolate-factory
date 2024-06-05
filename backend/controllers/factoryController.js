const FactoryService = require("../services/factoryService");

class FactoryController {
  constructor() {
    this.factoryService = new FactoryService();
  }

  getAllFactories(req, res) {
    const factories = this.factoryService.getAllFactories();
    res.json(factories);
  }

  getFactoryById(req, res) {
    const factory = this.factoryService.getFactoryById(req.params.id);
    if (factory) {
      res.json(factory);
    } else {
      res.status(404).json({ message: "Factory not found" });
    }
  }

  createFactory(req, res) {
    const newFactory = this.factoryService.createFactory(req.body);
    res.status(201).json(newFactory);
  }

  updateFactory(req, res) {
    const updatedFactory = this.factoryService.updateFactory(req.params.id, req.body);
    if (updatedFactory) {
      res.json(updatedFactory);
    } else {
      res.status(404).json({ message: "Factory not found" });
    }
  }

  deleteFactory(req, res) {
    const success = this.factoryService.deleteFactory(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Factory not found" });
    }
  }
}

module.exports = FactoryController;
