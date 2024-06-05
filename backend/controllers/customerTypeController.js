const CustomerTypeService = require("../services/customerTypeService");

class CustomerTypeController {
  constructor() {
    this.customerTypeService = new CustomerTypeService();
  }

  getAllCustomerTypes(req, res) {
    const customerTypes = this.customerTypeService.getAllCustomerTypes();
    res.json(customerTypes);
  }

  getCustomerTypeById(req, res) {
    const customerType = this.customerTypeService.getCustomerTypeById(req.params.id);
    if (customerType) {
      res.json(customerType);
    } else {
      res.status(404).json({ message: "Customer type not found" });
    }
  }

  createCustomerType(req, res) {
    const newCustomerType = this.customerTypeService.createCustomerType(req.body);
    res.status(201).json(newCustomerType);
  }

  updateCustomerType(req, res) {
    const updatedCustomerType = this.customerTypeService.updateCustomerType(req.params.id, req.body);
    if (updatedCustomerType) {
      res.json(updatedCustomerType);
    } else {
      res.status(404).json({ message: "Customer type not found" });
    }
  }

  deleteCustomerType(req, res) {
    const success = this.customerTypeService.deleteCustomerType(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Customer type not found" });
    }
  }
}

module.exports = CustomerTypeController;
