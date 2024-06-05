const CustomerTypeDAO = require("../dao/customerTypeDAO");
const CustomerType = require("../model/customerType");

class CustomerTypeService {
  constructor() {
    this.customerTypeDAO = new CustomerTypeDAO();
  }

  getAllCustomerTypes() {
    return this.customerTypeDAO.getAll();
  }

  getCustomerTypeById(id) {
    return this.customerTypeDAO.getById(id);
  }

  createCustomerType(data) {
    const newCustomerType = new CustomerType(
      data.name,
      data.description,
      data.discountRate
    );
    return this.customerTypeDAO.save(newCustomerType);
  }

  updateCustomerType(id, data) {
    const existingCustomerType = this.customerTypeDAO.getById(id);
    if (existingCustomerType) {
      existingCustomerType.name = data.name || existingCustomerType.name;
      existingCustomerType.description = data.description || existingCustomerType.description;
      existingCustomerType.discountRate = data.discountRate || existingCustomerType.discountRate;
      return this.customerTypeDAO.update(existingCustomerType);
    }
    return null;
  }

  deleteCustomerType(id) {
    const existingCustomerType = this.customerTypeDAO.getById(id);
    if (existingCustomerType) {
      this.customerTypeDAO.delete(existingCustomerType);
      return true;
    }
    return false;
  }
}

module.exports = CustomerTypeService;
