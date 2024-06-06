const express = require("express");
const AuthController = require("../controllers/authController");
const router = express.Router();

const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
