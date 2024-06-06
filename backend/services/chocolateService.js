const ChocolateDAO = require("../dao/chocolateDAO");
const Chocolate = require("../model/chocolate");

class ChocolateService {
  constructor() {
    this.chocolateDAO = new ChocolateDAO();
  }

  getAllChocolates() {
    return this.chocolateDAO.getAll();
  }

  getChocolateById(id) {
    return this.chocolateDAO.getById(id);
  }

  createChocolate(data) {
    const newChocolate = new Chocolate(
      data.name,
      data.type,
      data.manufacturer,
      data.price,
      data.expiryDate
    );
    return this.chocolateDAO.save(newChocolate);
  }

  updateChocolate(id, data) {
    const existingChocolate = this.chocolateDAO.getById(id);
    if (existingChocolate) {
      existingChocolate.name = data.name || existingChocolate.name;
      existingChocolate.type = data.type || existingChocolate.type;
      existingChocolate.manufacturer = data.manufacturer || existingChocolate.manufacturer;
      existingChocolate.price = data.price || existingChocolate.price;
      existingChocolate.expiryDate = data.expiryDate || existingChocolate.expiryDate;
      existingChocolate.quantity = data.quantity || existingChocolate.quantity;
      return this.chocolateDAO.update(existingChocolate);
    }
    return null;
  }

  deleteChocolate(id) {
    const existingChocolate = this.chocolateDAO.getById(id);
    if (existingChocolate) {
      this.chocolateDAO.delete(existingChocolate);
      return true;
    }
    return false;
  }

  getChocolatesByFactory(factoryId) {
    const chocolates = this.chocolateDAO.getAll();
    return chocolates.filter(chocolate => chocolate.factoryId == factoryId);
  }

}

module.exports = ChocolateService;
