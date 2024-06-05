const path = require("path");
const Serializer = require("../serializer/serializer");
const Employee = require("../models/employee");

class EmployeeDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/employees.csv");
		this.serializer = new Serializer();
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, Employee);
	}

	save(employee) {
		employee.id = this.nextId();
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
		this.employees.push(employee);
		this.serializer.toCSV(this.filePath, this.employees);
		return employee;
	}

	nextId() {
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
		if (this.employees.length < 1) {
			return 1;
		}
		return Math.max(...this.employees.map((e) => e.id)) + 1;
	}

	delete(employee) {
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
		const index = this.employees.findIndex((e) => e.id === employee.id);
		if (index !== -1) {
			this.employees.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.employees);
		}
	}

	update(employee) {
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
		const index = this.employees.findIndex((e) => e.id === employee.id);
		if (index !== -1) {
			this.employees[index] = employee;
			this.serializer.toCSV(this.filePath, this.employees);
		}
		return employee;
	}

	getById(employeeId) {
		this.employees = this.serializer.fromCSV(this.filePath, Employee);
		return this.employees.find((employee) => employee.id === employeeId);
	}
}

module.exports = EmployeeDAO;
