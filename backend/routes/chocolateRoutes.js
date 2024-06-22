const express = require("express");
const ChocolateController = require("../controllers/chocolateController");
const authenticateToken = require("../middleware/autenthicateToken");
const isUserManagerofFactory = require("../middleware/isUserManagerOfFactory");
const router = express.Router();

const chocolateController = new ChocolateController();

router.get("/:id", (req, res) =>
	chocolateController.getChocolateById(req, res)
);

router.post("/", authenticateToken, isUserManagerofFactory, (req, res) => {
	chocolateController.createChocolate(req, res);
});

router.put("/:id", authenticateToken, isUserManagerofFactory, (req, res) => {
	chocolateController.updateChocolate(req, res);
});

router.delete("/:id", authenticateToken, isUserManagerofFactory, (req, res) => {
	chocolateController.deleteChocolate(req, res);
});

router.get("/", (req, res) => {
	if (req.query.factoryId) {
		return chocolateController.getChocolatesByFactory(req, res);
	}
	return chocolateController.getAllChocolates(req, res);
});

module.exports = router;
