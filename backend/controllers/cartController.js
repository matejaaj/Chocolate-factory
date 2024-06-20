const CartService = require("../services/cartService");

class CartController {
	constructor() {
		this.cartService = new CartService();
	}

	getCart(req, res) {
		const cartItems = this.cartService.getCart(req.user.id);
		res.json(cartItems);
	}

	addToCart(req, res) {
		const { chocolateId, quantity, factoryId } = req.body;
		this.cartService.addToCart(req.user.id, chocolateId, quantity, factoryId);
		res.status(201).json({ message: "Item added to cart" });
	}

	updateCartItem(req, res) {
		const { chocolateId, quantity } = req.body;
		const updatedItem = this.cartService.updateCartItem(
			req.user.id,
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
		this.cartService.removeCartItem(req.user.id, chocolateId);
		res.status(204).send();
	}

	clearCart(req, res) {
		this.cartService.clearCart(req.user.id);
		res.status(204).send();
	}
}

module.exports = CartController;
