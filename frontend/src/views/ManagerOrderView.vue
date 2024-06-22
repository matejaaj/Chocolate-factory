<template>
	<div>
		<h2>Orders for Factory: {{ factoryName }}</h2>
		<table v-if="orders.length">
			<thead>
				<tr>
					<th>Total Price</th>
					<th>Date</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="order in orders" :key="order.id">
					<td>{{ order.totalPrice }}</td>
					<td>{{ formatDate(order.date) }}</td>
					<td>{{ order.status }}</td>
					<td>
						<button @click="viewOrderDetails(order.id)">View Details</button>
						<button v-if="order.status === 'Obrada'" @click="acceptOrder(order.id)">Accept</button>
						<button v-if="order.status === 'Obrada'" @click="declineOrder(order.id)" class="decline-button">Decline</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No orders found for this factory.</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'ManagerOrderView',
	data() {
		return {
			orders: [],
			factoryName: ''
		};
	},
	created() {
		this.fetchFactoryOrders();
	},
	methods: {
		async fetchFactoryOrders() {
			try {
				const factoryId = this.$route.params.id;
				const factoryResponse = await axios.get(`http://localhost:3000/rest/factories/${factoryId}`, {
					withCredentials: true
				});
				this.factoryName = factoryResponse.data.name;

				const ordersResponse = await axios.get(`http://localhost:3000/rest/orders/factory/${factoryId}`, {
					withCredentials: true
				});
				this.orders = ordersResponse.data;
			} catch (error) {
				console.error('Error fetching factory orders:', error);
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
		async acceptOrder(orderId) {
			try {
				await axios.put(`http://localhost:3000/rest/orders/accept/${orderId}`, {}, {
					withCredentials: true
				});
				this.fetchFactoryOrders();
				alert('Order accepted successfully');
			} catch (error) {
				console.error('Error accepting order:', error);
				alert('Error accepting order');
			}
		},
		async declineOrder(orderId) {
			const reason = prompt('Please enter the reason for declining this order:');
			if (reason) {
				try {
					await axios.put(`http://localhost:3000/rest/orders/decline/${orderId}`, { reason }, {
						withCredentials: true
					});
					this.fetchFactoryOrders();
					alert('Order declined successfully');
				} catch (error) {
					console.error('Error declining order:', error);
					alert('Error declining order');
				}
			} else {
				alert('Decline reason is required');
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
.decline-button {
	background-color: red;
	color: white;
	border: none;
	padding: 5px 10px;
	cursor: pointer;
}
</style>
