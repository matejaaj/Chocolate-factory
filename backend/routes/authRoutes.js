const express = require("express");
const AuthController = require("../controllers/authController");
const authenticateToken = require("../middleware/autenthicateToken");
const isManager = require("../middleware/isManager");
const router = express.Router();

const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/check-auth", (req, res) => authController.checkAuth(req, res));
router.post("/register", (req, res) => authController.register(req, res));
router.get("/role", (req, res) => authController.getRole(req, res));
router.post("/register-employee", authenticateToken, isManager, (req, res) =>
	authController.registerEmployee(req, res)
);

module.exports = router;
