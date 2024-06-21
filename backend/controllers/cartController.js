const CartService = require("../services/cartService");

class CartController {
	constructor() {
		this.cartService = new CartService();
	}

	getCart(req, res) {
		const cartItems = this.cartService.getCart(req.userId); // Koristi req.userId
		res.json(cartItems);
	}

	addToCart(req, res) {
		const { chocolateId, quantity, factoryId } = req.body;
		console.log("req.userId:", req.userId); // Dodaj ovaj ispis za proveru
		this.cartService.addToCart(req.userId, chocolateId, quantity, factoryId); // Koristi req.userId
		res.status(201).json({ message: "Item added to cart" });
	}

	updateCartItem(req, res) {
		const { chocolateId, quantity } = req.body;
		const updatedItem = this.cartService.updateCartItem(
			req.userId, // Koristi req.userId
			chocolateId,
			quantity
		);
		if (updatedItem) {
			res.json(updatedItem);
		} else {
			res.status(404).json({ message: "Item not found in cart" });
		}
	}

	removeCartItem(req, res) {
		const { chocolateId } = req.params;
		this.cartService.removeCartItem(req.userId, chocolateId); // Koristi req.userId
		res.status(204).send();
	}

	clearCart(req, res) {
		this.cartService.clearCart(req.userId); // Koristi req.userId
		res.status(204).send();
	}
}

module.exports = CartController;
