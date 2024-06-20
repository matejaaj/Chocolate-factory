const express = require("express");
const CartController = require("../controllers/cartController");
const router = express.Router();

const cartController = new CartController();

router.get("/", (req, res) => cartController.getCart(req, res));
router.post("/add", (req, res) => cartController.addToCart(req, res));
router.put("/update", (req, res) => cartController.updateCartItem(req, res));
router.delete("/remove/:chocolateId", (req, res) => cartController.removeCartItem(req, res));
router.delete("/clear", (req, res) => cartController.clearCart(req, res));

module.exports = router;
