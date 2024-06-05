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

  createEmployee(data) {
    const newEmployee = new Employee(
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.position,
      data.department
    );
    return this.employeeDAO.save(newEmployee);
  }

  updateEmployee(id, data) {
    const existingEmployee = this.employeeDAO.getById(id);
    if (existingEmployee) {
      existingEmployee.firstName = data.firstName || existingEmployee.firstName;
      existingEmployee.lastName = data.lastName || existingEmployee.lastName;
      existingEmployee.email = data.email || existingEmployee.email;
      existingEmployee.phone = data.phone || existingEmployee.phone;
      existingEmployee.position = data.position || existingEmployee.position;
      existingEmployee.department = data.department || existingEmployee.department;
      return this.employeeDAO.update(existingEmployee);
    }
    return null;
  }

  deleteEmployee(id) {
    const existingEmployee = this.employeeDAO.getById(id);
    if (existingEmployee) {
      this.employeeDAO.delete(existingEmployee);
      return true;
    }
    return false;
  }
}

module.exports = EmployeeService;
