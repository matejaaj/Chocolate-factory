<template>
	<div>
		<h2>Orders</h2>
		<div class="search-container">
			<div class="search-section">
				<h3>Search</h3>
				<div class="search-item">
					<label for="factoryName">Factory Name:</label>
					<input id="factoryName" v-model="search.factoryName" type="text" />
				</div>
				<div class="search-item">
					<label for="minPrice">Min Price:</label>
					<input id="minPrice" v-model="search.minPrice" type="number" />
				</div>
				<div class="search-item">
					<label for="maxPrice">Max Price:</label>
					<input id="maxPrice" v-model="search.maxPrice" type="number" />
				</div>
				<div class="search-item">
					<label for="startDate">Start Date:</label>
					<input id="startDate" v-model="search.startDate" type="date" />
				</div>
				<div class="search-item">
					<label for="endDate">End Date:</label>
					<input id="endDate" v-model="search.endDate" type="date" />
				</div>
				<div class="search-item">
					<button @click="fetchOrders(true, false)">Search</button>
				</div>
			</div>
			<div class="sort-section">
				<h3>Sort</h3>
				<div class="search-item">
					<label for="sortField">Sort by:</label>
					<select id="sortField" v-model="sort.field">
						<option value="factoryName">Factory Name</option>
						<option value="totalPrice">Total Price</option>
						<option value="date">Date</option>
					</select>
				</div>
				<div class="search-item">
					<label for="sortOrder">Order:</label>
					<select id="sortOrder" v-model="sort.order">
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
				<div class="search-item">
					<button @click="fetchOrders(false, true)">Sort</button>
				</div>
			</div>
		</div>
		<table v-if="orders.length">
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Factory Name</th>
					<th>Total Price</th>
					<th>Date</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="order in orders" :key="order.id">
					<td>{{ order.id }}</td>
					<td>{{ order.factoryName }}</td>
					<td>{{ order.totalPrice }}</td>
					<td>{{ formatDate(order.date) }}</td>
					<td>{{ order.status }}</td>
					<td>
						<button @click="viewOrderDetails(order.id)">View Details</button>
						<button v-if="order.status === 'Obrada'" @click="cancelOrder(order.id)" class="decline-button">Cancel Order</button>
						<button v-if="order.status === 'Odobreno' && !order.isReviewed" @click="createReview(order.id)">Review</button>
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
import axios from 'axios';

export default {
	name: 'OrdersView',
	data() {
		return {
			orders: [],
			search: {
				factoryName: '',
				minPrice: '',
				maxPrice: '',
				startDate: '',
				endDate: ''
			},
			sort: {
				field: 'date',
				order: 'asc'
			}
		};
	},
	created() {
		this.fetchOrders(false, false); // Fetch all orders initially without any search or sort parameters
	},
	methods: {
		async fetchOrders(applySearch, applySort) {
			try {
				let params = {};

				if (applySearch) {
					params.search = JSON.stringify(this.search);
				}

				if (applySort) {
					params.sort = JSON.stringify(this.sort);
				}

				const response = await axios.get('http://localhost:3000/rest/orders', {
					withCredentials: true,
					params
				});

				const ordersWithFactoryNames = await Promise.all(
					response.data.map(async (order) => {
						const factoryResponse = await axios.get(`http://localhost:3000/rest/factories/${order.factoryId}`, {
							withCredentials: true,
						});
						order.factoryName = factoryResponse.data.name;
						return order;
					})
				);

				this.orders = ordersWithFactoryNames;
			} catch (error) {
				console.error('Error fetching orders:', error);
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
				this.fetchOrders(false, false); // Refresh orders after cancelling
				alert('Order cancelled successfully');
			} catch (error) {
				console.error('Error cancelling order:', error);
				alert('Error cancelling order');
			}
		},
		createReview(orderId) {
			this.$router.push(`/create-review/${orderId}`);
		}
	},
};
</script>

<style>
.search-container {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;
}

.search-section, .sort-section {
	margin-right: 20px;
}

.search-item {
	margin-bottom: 10px;
}

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
