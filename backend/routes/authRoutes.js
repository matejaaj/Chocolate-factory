const express = require("express");
const AuthController = require("../controllers/authController");
const router = express.Router();

const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/check-auth", (req, res) => authController.checkAuth(req, res));

module.exports = router;
