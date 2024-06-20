<template>
	<div>
		<h2>Cart</h2>
		<table v-if="cartItems.length">
			<thead>
				<tr>
					<th>Name</th>
					<th>Weight</th>
					<th>Type</th>
					<th>Category</th>
					<th>Price</th>
					<th>Image</th>
					<th>Quantity</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in cartItems" :key="item.chocolate.id">
					<td>{{ item.chocolate.name }}</td>
					<td>{{ item.chocolate.weight }}</td>
					<td>{{ item.chocolate.type }}</td>
					<td>{{ item.chocolate.category }}</td>
					<td>{{ item.chocolate.price }}</td>
					<td>
						<img :src="getChocolateImage(item.chocolate.image)" alt="Chocolate Image" />
					</td>
					<td>
						<input type="number" v-model.number="item.quantity" :max="item.chocolate.quantity + item.quantity" min="1" @change="updateQuantity(item)" />
					</td>
					<td>
						<button @click="removeFromCart(item.chocolate.id)">Remove from Cart</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No items in the cart.</p>
		</div>
		<div>
			<h3>Total: {{ total }}</h3>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "CartView",
	data() {
		return {
			cartItems: [],
			total: 0,
		};
	},
	created() {
		this.fetchCart();
	},
	methods: {
		async fetchCart() {
			try {
				const response = await axios.get("http://localhost:3000/cart", {
					withCredentials: true,
				});
				this.cartItems = response.data;
				this.calculateTotal();
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		},
		async updateQuantity(item) {
			try {
				await axios.put(
					`http://localhost:3000/cart/update`,
					{ chocolateId: item.chocolate.id, quantity: item.quantity },
					{ withCredentials: true }
				);
				this.calculateTotal();
			} catch (error) {
				console.error("Error updating cart item quantity:", error);
			}
		},
		async removeFromCart(chocolateId) {
			try {
				await axios.delete(`http://localhost:3000/cart/remove/${chocolateId}`, {
					withCredentials: true,
				});
				this.cartItems = this.cartItems.filter((item) => item.chocolate.id !== chocolateId);
				this.calculateTotal();
			} catch (error) {
				console.error("Error removing item from cart:", error);
			}
		},
		calculateTotal() {
			this.total = this.cartItems.reduce((acc, item) => acc + item.chocolate.price * item.quantity, 0);
		},
		getChocolateImage(imagePath) {
			try {
				return require(`@/assets/images/${imagePath.split("/").pop()}`);
			} catch (e) {
				console.error(`Image not found: ${imagePath}`);
				return "";
			}
		},
	},
};
</script>

<style>
img {
	max-width: 100px;
	height: auto;
}
button {
	padding: 5px 10px;
	cursor: pointer;
}
</style>
