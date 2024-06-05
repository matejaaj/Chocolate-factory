const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

const customerController = new CustomerController();

router.get("/customers", (req, res) => customerController.getAllCustomers(req, res));
router.get("/customers/:id", (req, res) => customerController.getCustomerById(req, res));
router.post("/customers", (req, res) => customerController.createCustomer(req, res));
router.put("/customers/:id", (req, res) => customerController.updateCustomer(req, res));
router.delete("/customers/:id", (req, res) => customerController.deleteCustomer(req, res));

module.exports = router;
