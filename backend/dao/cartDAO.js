const path = require("path");
const Serializer = require("../serializer/serializer");
const Cart = require("../model/cart");

class CartDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/cart.csv");
		this.serializer = new Serializer();
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
	}

	getAll() {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		return this.cartItems.filter((item) => !item.isDeleted);
	}

	getByUserId(userId) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		const userCartItems = this.cartItems.filter((item) => item.userId == userId && !item.isDeleted && !item.isOrdered);
		return userCartItems;
	}

	save(cartItem) {
		cartItem.id = this.nextId();
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		this.cartItems.push(cartItem);
		this.serializer.toCSV(this.filePath, this.cartItems);
		return cartItem;
	}

	nextId() {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		if (this.cartItems.length < 1) {
			return 1;
		}
		return Math.max(...this.cartItems.map((item) => item.id)) + 1;
	}

	update(cartItem) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		const index = this.cartItems.findIndex((item) => item.id == cartItem.id);
		if (index !== -1) {
			this.cartItems[index] = cartItem;
			this.serializer.toCSV(this.filePath, this.cartItems);
		}
		return cartItem;
	}

	deleteByUserIdAndChocolateId(userId, chocolateId) {
		this.cartItems = this.getByUserId(userId);
		const index = this.cartItems.findIndex((item) => item.userId == userId && item.chocolateId == chocolateId );
		if (index !== -1) {
			this.cartItems[index].isDeleted = true;
			this.serializer.toCSV(this.filePath, this.cartItems);
		}
	}

	markAsOrdered(cartItemIds) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		this.cartItems.forEach(item => {
			if (cartItemIds.includes(item.id)) {
				item.isOrdered = true;
			}
		});
		this.serializer.toCSV(this.filePath, this.cartItems);
	}

	clearByUserId(userId) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		this.cartItems.forEach((item) => {
			if (item.userId == userId) {
				item.isDeleted = true;
			}
		});
		this.serializer.toCSV(this.filePath, this.cartItems);
	}
}

module.exports = CartDAO;
