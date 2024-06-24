const CustomerService = require("../services/customerService");

class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }

  getAllCustomers(req, res) {
    const customers = this.customerService.getAllCustomers();
    res.json(customers);
  }

  getCustomerById(req, res) {
    const customer = this.customerService.getCustomerById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  }

  createCustomer(req, res) {
    const newCustomer = this.customerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  }

  updateCustomer(req, res) {
    const updatedCustomer = this.customerService.updateCustomer(req.params.id, req.body);
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  }

  deleteCustomer(req, res) {
    const success = this.customerService.deleteCustomer(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  }

  getCustomerDiscount(req, res) {
		const customerId = req.userId; 
		const discount = this.customerService.getDiscount(customerId);
		if (discount === null) {
			return res.status(404).send('Customer not found');
		}
		res.json({ discount });
	}
}

module.exports = CustomerController;
