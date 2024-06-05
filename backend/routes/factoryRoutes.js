const express = require("express");
const FactoryController = require("../controllers/factoryController");
const router = express.Router();

const factoryController = new FactoryController();

router.get("/factories", (req, res) => factoryController.getAllFactories(req, res));
router.get("/factories/:id", (req, res) => factoryController.getFactoryById(req, res));
router.post("/factories", (req, res) => factoryController.createFactory(req, res));
router.put("/factories/:id", (req, res) => factoryController.updateFactory(req, res));
router.delete("/factories/:id", (req, res) => factoryController.deleteFactory(req, res));

module.exports = router;
