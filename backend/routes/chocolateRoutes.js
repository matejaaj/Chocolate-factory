const express = require("express");
const ChocolateController = require("../controllers/chocolateController");
const router = express.Router();

const chocolateController = new ChocolateController();

router.get("/:id", (req, res) =>
	chocolateController.getChocolateById(req, res)
);
router.post("/", (req, res) => chocolateController.createChocolate(req, res));
router.put("/:id", (req, res) => chocolateController.updateChocolate(req, res));
router.delete("/:id", (req, res) =>
	chocolateController.deleteChocolate(req, res)
);
router.get("/", (req, res) => {
	if (req.query.factoryId) {
		return chocolateController.getChocolatesByFactory(req, res);
	}
	return chocolateController.getAllChocolates(req, res);
});

module.exports = router;
