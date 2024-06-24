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
				<tr v-for="item in cartItems" :key="item.chocolateId">
					<td>{{ getChocolateById(item.chocolateId).name }}</td>
					<td>{{ getChocolateById(item.chocolateId).weight }}</td>
					<td>{{ getChocolateById(item.chocolateId).type }}</td>
					<td>{{ getChocolateById(item.chocolateId).category }}</td>
					<td>{{ getChocolateById(item.chocolateId).price }}</td>
					<td>
						<img :src="getChocolateImage(getChocolateById(item.chocolateId).image)" alt="Chocolate Image" />
					</td>
					<td>
						<input type="number" v-model.number="item.quantity" :max="getChocolateById(item.chocolateId).quantity + item.quantity" min="1" @change="updateQuantity(item)" />
					</td>
					<td>
						<button @click="removeFromCart(item.chocolateId)">Remove from Cart</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No items in the cart.</p>
		</div>
		<div>
			<h3>Total: {{ total }}</h3>
			<h3 v-if="discountedTotal < total">Discounted Total: {{ discountedTotal }}</h3>
		</div>
		<div v-if="cartItems.length">
			<button @click="createOrder">Buy</button>
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
			chocolates: [],
			total: 0,
			discountedTotal: 0,
			discount: 0
		};
	},
	created() {
		this.fetchCart();
		this.fetchChocolates();
		this.fetchDiscount();
	},
	methods: {
		async fetchCart() {
			try {
				const response = await axios.get("http://localhost:3000/rest/cart", {
					withCredentials: true,
				});
				this.cartItems = response.data;
				this.calculateTotal();
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		},
		async fetchChocolates() {
			try {
				const response = await axios.get("http://localhost:3000/rest/chocolates", {
					withCredentials: true,
				});
				this.chocolates = response.data;
				this.calculateTotal();
			} catch (error) {
				console.error("Error fetching chocolates:", error);
			}
		},
		async fetchDiscount() {
			try {
				const response = await axios.get("http://localhost:3000/rest/customers/discount/find", {
					withCredentials: true,
				});
				this.discount = response.data.discount;
				this.calculateTotal();
			} catch (error) {
				console.error("Error fetching discount:", error);
			}
		},
		getChocolateById(chocolateId) {
			return this.chocolates.find(chocolate => chocolate.id == chocolateId) || {};
		},
		async updateQuantity(item) {
			try {
				await axios.put(
					`http://localhost:3000/rest/cart/update`,
					{ chocolateId: item.chocolateId, quantity: item.quantity },
					{ withCredentials: true }
				);
				this.calculateTotal();
			} catch (error) {
				console.error("Error updating cart item quantity:", error);
			}
		},
		async removeFromCart(chocolateId) {
			try {
				await axios.delete(`http://localhost:3000/rest/cart/remove/${chocolateId}`, {
					withCredentials: true,
				});
				this.cartItems = this.cartItems.filter((item) => item.chocolateId != chocolateId);
				this.calculateTotal();
			} catch (error) {
				console.error("Error removing item from cart:", error);
			}
		},
		async createOrder() {
			try {
				await axios.post("http://localhost:3000/rest/orders", {}, { withCredentials: true });
				alert("Order created successfully!");
				this.cartItems = [];
				this.total = 0;
				this.discountedTotal = 0;
				this.fetchCart();
			} catch (error) {
				console.error("Error creating order:", error);
			}
		},
		calculateTotal() {
			if (this.cartItems.length && this.chocolates.length) {
				this.total = this.cartItems.reduce((acc, item) => acc + this.getChocolateById(item.chocolateId).price * item.quantity, 0);
				this.discountedTotal = this.total * (1 - this.discount / 100);
			}
		},
		getChocolateImage(imagePath) {
			try {
				return require(`@/assets/images/${imagePath.split("/").pop()}`);
			} catch (e) {
				console.error(`Image not found: ${imagePath}`);
				return "";
			}
		}
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
