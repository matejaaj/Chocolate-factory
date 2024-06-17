const express = require("express");
const CustomerTypeController = require("../controllers/customerTypeController");
const router = express.Router();

const customerTypeController = new CustomerTypeController();

router.get("/", (req, res) =>
	customerTypeController.getAllCustomerTypes(req, res)
);
router.get("/:id", (req, res) =>
	customerTypeController.getCustomerTypeById(req, res)
);
router.post("/", (req, res) =>
	customerTypeController.createCustomerType(req, res)
);
router.put("/:id", (req, res) =>
	customerTypeController.updateCustomerType(req, res)
);
router.delete("/:id", (req, res) =>
	customerTypeController.deleteCustomerType(req, res)
);

module.exports = router;
