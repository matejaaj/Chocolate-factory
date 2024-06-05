const express = require("express");
const ManagerController = require("../controllers/managerController");
const router = express.Router();

const managerController = new ManagerController();

router.get("/managers", (req, res) => managerController.getAllManagers(req, res));
router.get("/managers/:id", (req, res) => managerController.getManagerById(req, res));
router.post("/managers", (req, res) => managerController.createManager(req, res));
router.put("/managers/:id", (req, res) => managerController.updateManager(req, res));
router.delete("/managers/:id", (req, res) => managerController.deleteManager(req, res));

module.exports = router;
