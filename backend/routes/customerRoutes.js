const express = require("express");
const CustomerController = require("../controllers/customerController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const customerController = new CustomerController();

router.get("/", authenticateToken, (req, res) => customerController.getAllCustomers(req, res));
router.get("/:id", authenticateToken, (req, res) => customerController.getCustomerById(req, res));
router.post("/", authenticateToken, (req, res) => customerController.createCustomer(req, res));
router.put("/:id", authenticateToken, (req, res) => customerController.updateCustomer(req, res));
router.delete("/:id", authenticateToken, (req, res) => customerController.deleteCustomer(req, res));
router.put("/:id/addPoints", authenticateToken, (req, res) => customerController.addPoints(req, res));
router.get("/discount/find", authenticateToken, (req, res) => customerController.getCustomerDiscount(req, res)); 

module.exports = router;
