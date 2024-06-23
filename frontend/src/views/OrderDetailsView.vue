<template>
	<div>
		<h2>Order Details</h2>
		<div v-if="order">
			<p><strong>Total Price:</strong> {{ order.totalPrice }}</p>
			<p><strong>Date:</strong> {{ formatDate(order.date) }}</p>
			<p><strong>Status:</strong> {{ order.status }}</p>
			<p><strong>Items:</strong></p>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Weight</th>
						<th>Type</th>
						<th>Category</th>
						<th>Price</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in orderItems" :key="item.id">
						<td>{{ item.name }}</td>
						<td>{{ item.weight }}</td>
						<td>{{ item.type }}</td>
						<td>{{ item.category }}</td>
						<td>{{ item.price }}</td>
						<td>
							<img :src="getChocolateImage(item.image)" alt="Chocolate Image" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-else>
			<p>Order not found.</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "OrderDetailsView",
	props: {
		id: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			order: null,
			orderItems: []
		};
	},
	created() {
		console.log("Order ID:", this.id); // Proveri ID
		this.fetchOrderDetails();
	},
	methods: {
		async fetchOrderDetails() {
			try {
				const response = await axios.get(`http://localhost:3000/rest/orders/${this.id}`, {
					withCredentials: true,
				});
				this.order = response.data;
				console.log("Order:", this.order); // Proveri dobijeni order
				await this.fetchOrderItems();
			} catch (error) {
				console.error("Error fetching order details:", error);
			}
		},
		async fetchOrderItems() {
			try {
				console.log("Cart Item IDs:", this.order.cartItemIds); // Proveri cartItemIds
				const items = await Promise.all(
					this.order.chocolateIds.map(async (id) => {
						const response = await axios.get(`http://localhost:3000/rest/chocolates/${id}`, {
							withCredentials: true,
						});
						return response.data;
					})
				);
				this.orderItems = items;
			} catch (error) {
				console.error("Error fetching order items:", error);
			}
		},
		formatDate(dateString) {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}.${month}.${day}`;
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
button {
	padding: 5px 10px;
	cursor: pointer;
}
img {
	max-width: 100px;
	height: auto;
}
</style>
