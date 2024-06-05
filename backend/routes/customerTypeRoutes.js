const express = require("express");
const CustomerTypeController = require("../controllers/customerTypeController");
const router = express.Router();

const customerTypeController = new CustomerTypeController();

router.get("/customerTypes", (req, res) => customerTypeController.getAllCustomerTypes(req, res));
router.get("/customerTypes/:id", (req, res) => customerTypeController.getCustomerTypeById(req, res));
router.post("/customerTypes", (req, res) => customerTypeController.createCustomerType(req, res));
router.put("/customerTypes/:id", (req, res) => customerTypeController.updateCustomerType(req, res));
router.delete("/customerTypes/:id", (req, res) => customerTypeController.deleteCustomerType(req, res));

module.exports = router;
