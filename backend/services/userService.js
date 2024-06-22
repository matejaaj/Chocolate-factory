const UserDAO = require("../dao/userDAO");
const User = require("../model/user");
const CustomerService = require("./customerService");
const CustomerTypeService = require("./customerTypeService");

class UserService {
	constructor() {
		this.userDAO = new UserDAO();
		this.customerService = new CustomerService();
		this.customerTypeService = new CustomerTypeService();
	}

	getAllUsers(search, filter, sort) {
		let users = this.userDAO.getAll();
		let customers = this.customerService.getAllCustomers();
		let customerTypes = this.customerTypeService.getAllCustomerTypes();

		// Merge user and customer data
		users = users.map((user) => {
			if (user.role === "CUSTOMER") {
				const customer = customers.find((c) => c.id === user.id);
				if (customer) {
					user.points = customer.points;
					user.customerTypeId = customer.customerTypeId;
					const customerType = customerTypes.find(
						(type) => type.id === customer.customerTypeId
					);
					if (customerType) {
						user.customerTypeName = customerType.name;
					}
				}
			}
			return user;
		});

		// Apply search filters
		if (search.firstName) {
			users = users.filter((user) =>
				user.firstName.toLowerCase().includes(search.firstName.toLowerCase())
			);
		}
		if (search.lastName) {
			users = users.filter((user) =>
				user.lastName.toLowerCase().includes(search.lastName.toLowerCase())
			);
		}
		if (search.username) {
			users = users.filter((user) =>
				user.username.toLowerCase().includes(search.username.toLowerCase())
			);
		}

		// Apply role and type filters
		if (filter.role) {
			users = users.filter((user) => user.role === filter.role);
			if (filter.role === "CUSTOMER" && filter.type) {
				users = users.filter(
					(user) => user.customerTypeId === parseInt(filter.type)
				);
			}
		}

		// Apply sorting
		if (sort && sort.field) {
			users.sort((a, b) => {
				if (a[sort.field] < b[sort.field]) return sort.order === "asc" ? -1 : 1;
				if (a[sort.field] > b[sort.field]) return sort.order === "asc" ? 1 : -1;
				return 0;
			});
		}

		return users;
	}

	async createUser(data) {
		const existingUser = this.userDAO.findByUsername(data.username);
		if (existingUser) {
			throw new Error("Username already exists");
		}

		const newUser = new User(
			data.username,
			data.password,
			data.firstName,
			data.lastName,
			data.gender,
			data.birthDate,
			data.role
		);

		const savedUser = this.userDAO.save(newUser);
		return savedUser;
	}

	getUserById(userId) {
		return this.userDAO.getById(userId);
	}

	findUserByUsername(username) {
		return this.userDAO.findByUsername(username);
	}

	blockUser(userId) {
		const user = this.getUserById(userId);
		if (user && user.role !== "ADMINISTRATOR") {
			user.isBlocked = true;
			return this.userDAO.update(user);
		}
		return null;
	}

	unblockUser(userId) {
		const user = this.getUserById(userId);
		if (user && user.role !== "ADMINISTRATOR") {
			user.isBlocked = false;
			return this.userDAO.update(user);
		}
		return null;
	}
}

module.exports = UserService;
