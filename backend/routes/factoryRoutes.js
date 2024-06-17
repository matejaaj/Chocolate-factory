const express = require("express");
const FactoryController = require("../controllers/factoryController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const factoryController = new FactoryController();

router.get("/", (req, res) => factoryController.getAllFactories(req, res));

router.post("/", (req, res) => factoryController.createFactory(req, res));
router.get("/:id", (req, res) => {
	factoryController.getFactoryById(req, res);
});

router.delete("/:id", (req, res) => factoryController.deleteFactory(req, res));

router.get("/isManager/:factoryId", authenticateToken, (req, res) =>
	factoryController.isUserManager(req, res)
);
module.exports = router;
