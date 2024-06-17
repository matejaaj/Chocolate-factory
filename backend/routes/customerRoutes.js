const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

const customerController = new CustomerController();

router.get("/", (req, res) => customerController.getAllCustomers(req, res));
router.get("/:id", (req, res) => customerController.getCustomerById(req, res));
router.post("/", (req, res) => customerController.createCustomer(req, res));
router.put("/:id", (req, res) => customerController.updateCustomer(req, res));
router.delete("/:id", (req, res) =>
	customerController.deleteCustomer(req, res)
);

module.exports = router;
