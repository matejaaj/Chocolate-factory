const EmployeeService = require("../services/employeeService");

class EmployeeController {
  constructor() {
    this.employeeService = new EmployeeService();
  }

  getAllEmployees(req, res) {
    const employees = this.employeeService.getAllEmployees();
    res.json(employees);
  }

  getEmployeeById(req, res) {
    const employee = this.employeeService.getEmployeeById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  }

  createEmployee(req, res) {
    const newEmployee = this.employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  }

  updateEmployee(req, res) {
    const updatedEmployee = this.employeeService.updateEmployee(req.params.id, req.body);
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  }

  deleteEmployee(req, res) {
    const success = this.employeeService.deleteEmployee(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  }
}

module.exports = EmployeeController;
