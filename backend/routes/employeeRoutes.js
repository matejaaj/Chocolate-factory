const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const router = express.Router();

const employeeController = new EmployeeController();

router.get("/employees", (req, res) => employeeController.getAllEmployees(req, res));
router.get("/employees/:id", (req, res) => employeeController.getEmployeeById(req, res));
router.post("/employees", (req, res) => employeeController.createEmployee(req, res));
router.put("/employees/:id", (req, res) => employeeController.updateEmployee(req, res));
router.delete("/employees/:id", (req, res) => employeeController.deleteEmployee(req, res));

module.exports = router;
