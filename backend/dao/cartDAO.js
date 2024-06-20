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
		return this.cartItems;
	}

	getByUserId(userId) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		return this.cartItems.filter((item) => item.userId === userId);
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
		const index = this.cartItems.findIndex((item) => item.id === cartItem.id);
		if (index !== -1) {
			this.cartItems[index] = cartItem;
			this.serializer.toCSV(this.filePath, this.cartItems);
		}
		return cartItem;
	}

	deleteByUserIdAndChocolateId(userId, chocolateId) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		this.cartItems = this.cartItems.filter(
			(item) => !(item.userId === userId && item.chocolateId === chocolateId)
		);
		this.serializer.toCSV(this.filePath, this.cartItems);
	}

	clearByUserId(userId) {
		this.cartItems = this.serializer.fromCSV(this.filePath, Cart);
		this.cartItems = this.cartItems.filter((item) => item.userId !== userId);
		this.serializer.toCSV(this.filePath, this.cartItems);
	}
}

module.exports = CartDAO;
