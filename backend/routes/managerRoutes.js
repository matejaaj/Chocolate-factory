const express = require("express");
const ManagerController = require("../controllers/managerController");
const router = express.Router();

const managerController = new ManagerController();

router.get("/", (req, res) => managerController.getAllManagers(req, res));
router.get(":id", (req, res) => managerController.getManagerById(req, res));
router.post("/", (req, res) => managerController.createManager(req, res));
router.put(":id", (req, res) => managerController.updateManager(req, res));
router.delete("/:id", (req, res) => managerController.deleteManager(req, res));

module.exports = router;
