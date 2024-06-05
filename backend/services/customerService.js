const CustomerDAO = require("../dao/customerDAO");
const Customer = require("../model/customer");

class CustomerService {
  constructor() {
    this.customerDAO = new CustomerDAO();
  }

  getAllCustomers() {
    return this.customerDAO.getAll();
  }

  getCustomerById(id) {
    return this.customerDAO.getById(id);
  }

  createCustomer(data) {
    const newCustomer = new Customer(
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.address
    );
    return this.customerDAO.save(newCustomer);
  }

  updateCustomer(id, data) {
    const existingCustomer = this.customerDAO.getById(id);
    if (existingCustomer) {
      existingCustomer.firstName = data.firstName || existingCustomer.firstName;
      existingCustomer.lastName = data.lastName || existingCustomer.lastName;
      existingCustomer.email = data.email || existingCustomer.email;
      existingCustomer.phone = data.phone || existingCustomer.phone;
      existingCustomer.address = data.address || existingCustomer.address;
      return this.customerDAO.update(existingCustomer);
    }
    return null;
  }

  deleteCustomer(id) {
    const existingCustomer = this.customerDAO.getById(id);
    if (existingCustomer) {
      this.customerDAO.delete(existingCustomer);
      return true;
    }
    return false;
  }
}

module.exports = CustomerService;
