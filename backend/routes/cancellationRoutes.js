const express = require("express");
const CancellationController = require("../controllers/cancellationController");
const authenticateToken = require("../middleware/autenthicateToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

const cancellationController = new CancellationController();

router.get("/", authenticateToken, isAdmin, (req, res) => cancellationController.getAllCancellations(req, res));
router.post("/", authenticateToken, (req, res) => cancellationController.createCancellation(req, res));
router.get("/isSuspicious/:id", authenticateToken, isAdmin, (req, res) => cancellationController.isUserSuspicious(req, res));

module.exports = router;
