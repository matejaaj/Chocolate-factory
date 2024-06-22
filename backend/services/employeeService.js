const EmployeeDAO = require("../dao/employeeDAO");
const Employee = require("../model/employee");

class EmployeeService {
	constructor() {
		this.employeeDAO = new EmployeeDAO();
	}

	getAllEmployees() {
		return this.employeeDAO.getAll();
	}

	getEmployeeById(id) {
		return this.employeeDAO.getById(id);
	}

	createEmployee({ userId, factoryId }) {
		const newEmployee = new Employee(userId, factoryId);
		return this.employeeDAO.save(newEmployee);
	}
}

module.exports = EmployeeService;
