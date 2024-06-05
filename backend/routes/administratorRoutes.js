const express = require("express");
const AdministratorController = require("../controllers/administratorController");
const router = express.Router();

const administratorController = new AdministratorController();

router.get("/administrators", (req, res) => administratorController.getAllAdministrators(req, res));
router.get("/administrators/:id", (req, res) => administratorController.getAdministratorById(req, res));
router.post("/administrators", (req, res) => administratorController.createAdministrator(req, res));
router.put("/administrators/:id", (req, res) => administratorController.updateAdministrator(req, res));
router.delete("/administrators/:id", (req, res) => administratorController.deleteAdministrator(req, res));

module.exports = router;
