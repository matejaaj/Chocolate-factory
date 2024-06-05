const FactoryDAO = require("../dao/factoryDAO");
const Factory = require("../model/factory");

class FactoryService {
  constructor() {
    this.factoryDAO = new FactoryDAO();
  }

  getAllFactories() {
    return this.factoryDAO.getAll();
  }

  getFactoryById(id) {
    return this.factoryDAO.getById(id);
  }

  createFactory(data) {
    const newFactory = new Factory(
      data.name,
      data.location,
      data.productionCapacity
    );
    return this.factoryDAO.save(newFactory);
  }

  updateFactory(id, data) {
    const existingFactory = this.factoryDAO.getById(id);
    if (existingFactory) {
      existingFactory.name = data.name || existingFactory.name;
      existingFactory.location = data.location || existingFactory.location;
      existingFactory.productionCapacity = data.productionCapacity || existingFactory.productionCapacity;
      return this.factoryDAO.update(existingFactory);
    }
    return null;
  }

  deleteFactory(id) {
    const existingFactory = this.factoryDAO.getById(id);
    if (existingFactory) {
      this.factoryDAO.delete(existingFactory);
      return true;
    }
    return false;
  }
}

module.exports = FactoryService;
