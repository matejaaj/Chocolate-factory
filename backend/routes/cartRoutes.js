const express = require("express");
const CartController = require("../controllers/cartController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const cartController = new CartController();

router.get("/", authenticateToken, (req, res) => cartController.getCart(req, res));
router.post("/add", authenticateToken, (req, res) => cartController.addToCart(req, res));
router.put("/update", authenticateToken, (req, res) => cartController.updateCartItem(req, res));
router.delete("/remove/:chocolateId", authenticateToken, (req, res) => cartController.removeCartItem(req, res));
router.delete("/clear", authenticateToken, (req, res) => cartController.clearCart(req, res));

module.exports = router;
