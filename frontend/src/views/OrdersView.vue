<template>
	<div>
		<h2>Orders</h2>
		<table v-if="orders.length">
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Total Price</th>
					<th>Date</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="order in orders" :key="order.id">
					<td>{{ order.id }}</td>
					<td>{{ order.totalPrice }}</td>
					<td>{{ formatDate(order.date) }}</td>
					<td>{{ order.status }}</td>
					<td>
						<button @click="viewOrderDetails(order.id)">View Details</button>
						<button v-if="order.status === 'Obrada'" @click="cancelOrder(order.id)">Cancel Order</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No orders found.</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "OrdersView",
	data() {
		return {
			orders: [],
		};
	},
	created() {
		this.fetchOrders();
	},
	methods: {
		async fetchOrders() {
			try {
				const response = await axios.get("http://localhost:3000/rest/orders", {
					withCredentials: true,
				});
				this.orders = response.data;
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		},
		formatDate(dateString) {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}.${month}.${day}`;
		},
		viewOrderDetails(orderId) {
			this.$router.push(`/order-details/${orderId}`);
		},
		async cancelOrder(orderId) {
			try {
				await axios.put(`http://localhost:3000/rest/orders/cancel/${orderId}`, {}, {
					withCredentials: true,
				});
				this.fetchOrders();
				alert("Order cancelled successfully");
			} catch (error) {
				console.error("Error cancelling order:", error);
				alert("Error cancelling order");
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
</style>
