const CartDAO = require("../dao/cartDAO");
const Cart = require("../model/cart");

class CartService {
	constructor() {
		this.cartDAO = new CartDAO();
	}

	getCart(userId) {
		return this.cartDAO.getByUserId(userId);
	}

	addToCart(userId, chocolateId, quantity, factoryId) {
		const existingItems = this.cartDAO.getByUserId(userId);
		const existingItem = existingItems.find(
			(item) => item.chocolateId === chocolateId
		);
		if (existingItem) {
			existingItem.quantity += quantity;
			return this.cartDAO.update(existingItem);
		} else {
			const newItem = new Cart(userId, chocolateId, quantity, factoryId);
			return this.cartDAO.save(newItem);
		}
	}

	updateCartItem(userId, chocolateId, quantity) {
		const items = this.cartDAO.getByUserId(userId);
		const item = items.find((item) => item.chocolateId === chocolateId);
		if (item) {
			item.quantity = quantity;
			return this.cartDAO.update(item);
		}
		return null;
	}

	removeCartItem(userId, chocolateId) {
		this.cartDAO.deleteByUserIdAndChocolateId(userId, chocolateId);
	}
	
	markItemsAsOrdered(cartItemIds) {
		this.cartDAO.markAsOrdered(cartItemIds);
	}

	clearCart(userId) {
		this.cartDAO.clearByUserId(userId);
	}
}

module.exports = CartService;
