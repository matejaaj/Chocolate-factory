const CustomerDAO = require("../dao/customerDAO");
const Customer = require("../model/customer");
const CustomerTypeService = require("../services/customerTypeService");

class CustomerService {
	constructor() {
		this.customerDAO = new CustomerDAO();
		this.customerTypeService = new CustomerTypeService();
	}

	getAllCustomers() {
		return this.customerDAO.getAll();
	}

	getCustomerById(id) {
		return this.customerDAO.getById(id);
	}

	createCustomer(data) {
		const newCustomer = new Customer(data);
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

	addPoints(customerId, points) {
		const customer = this.customerDAO.getById(customerId);
		if (customer) {
			customer.points += points;
			this.customerDAO.update(customer);

			const customerTypes = this.customerTypeService.getAllCustomerTypes();
			let appropriateType = null;

			customerTypes.forEach(type => {
				if (customer.points >= type.pointsRequired) {
					if (!appropriateType || type.pointsRequired > appropriateType.pointsRequired) {
						appropriateType = type;
					}
				}
			});

			if (appropriateType && customer.customerTypeId !== appropriateType.id) {
				customer.customerTypeId = appropriateType.id;
				this.customerDAO.update(customer);
			}

			return customer;
		}
		return null;
	}

	getDiscount(customerId) {
		console.log("CustomerService.getDiscount called with customerId:", customerId);
		const customer = this.getCustomerById(customerId);
		if (!customer) {
			console.log("Customer not found in getDiscount");
			return null;
		}
		const customerType = this.customerTypeService.getCustomerTypeById(customer.customerTypeId);
		if (!customerType) {
			console.log("Customer type not found");
			return null;
		}
		console.log("Customer discount:", customerType.discount);
		return customerType.discount;
	}
}

module.exports = CustomerService;
