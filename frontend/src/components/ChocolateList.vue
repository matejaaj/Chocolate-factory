<template>
	<div>
		<h2>Chocolates</h2>
		<div v-if="isManager">
			<button @click="addChocolate">Add New Chocolate</button>
		</div>
		<table v-if="filteredChocolates.length">
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Type</th>
					<th>Category</th>
					<th>Weight</th>
					<th>Description</th>
					<th>Image</th>
					<th>Status</th>
					<th>Quantity</th>
					<th v-if="isManager || isCustomer">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="chocolate in filteredChocolates" :key="chocolate.id">
					<td>{{ chocolate.name }}</td>
					<td>{{ chocolate.price }}</td>
					<td>{{ chocolate.type }}</td>
					<td>{{ chocolate.category }}</td>
					<td>{{ chocolate.weight }}</td>
					<td>{{ chocolate.description }}</td>
					<td>
						<img
							:src="getChocolateImage(chocolate.image)"
							alt="Chocolate Image"
						/>
					</td>
					<td>{{ chocolate.status }}</td>
					<td v-if="isEmployee">
						<input type="number" v-model.number="chocolate.quantity" min="0" />
						<button @click="updateQuantity(chocolate.id, chocolate.quantity)">
							Update
						</button>
					</td>
					<td v-else>{{ chocolate.quantity }}</td>
					<td>
						<div v-if="isManager">
							<button @click="editChocolate(chocolate.id)">Edit</button>
							<button @click="deleteChocolate(chocolate.id)">Delete</button>
						</div>
						<div v-if="isCustomer">
							<input
								type="number"
								v-model.number="quantities[chocolate.id]"
								:max="chocolate.quantity"
								min="1"
							/>
							<button @click="addToCart(chocolate, quantities[chocolate.id])">
								Add to Cart
							</button>
						</div>
						<div v-if="isEmployee"></div>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No chocolates found.</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "ChocolateList",
	props: {
		factoryId: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			chocolates: [],
			isManager: false,
			isCustomer: false,
			isEmployee: false,
			quantities: {},
		};
	},
	computed: {
		filteredChocolates() {
			if (this.isCustomer) {
				return this.chocolates.filter((chocolate) => chocolate.quantity > 0);
			}
			return this.chocolates;
		},
	},
	created() {
		this.fetchChocolates();
		this.checkIfInFactory();
		this.checkIfCustomer();
	},
	methods: {
		async fetchChocolates() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/chocolates?factoryId=${this.factoryId}`,
					{
						withCredentials: true,
					}
				);
				this.chocolates = response.data;
			} catch (error) {
				console.error("Error fetching chocolates:", error);
			}
		},
		async checkIfInFactory() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/factories/isInFactory/${this.factoryId}`,
					{
						withCredentials: true,
					}
				);
				this.isManager = response.data.isManager;
				this.isEmployee = response.data.isEmployee;
			} catch (error) {
				console.error("Error checking manager status:", error);
			}
		},
		async checkIfCustomer() {
			try {
				const response = await axios.get(`http://localhost:3000/auth/role`, {
					withCredentials: true,
				});
				const role = response.data.role;
				if (role === "CUSTOMER") {
					this.isCustomer = true;
				}
			} catch (error) {
				console.error("Error checking user role:", error);
			}
		},
		async deleteChocolate(chocolateId) {
			try {
				await axios.delete(
					`http://localhost:3000/rest/chocolates/${chocolateId}`,
					{
						data: { factoryId: this.factoryId },
						withCredentials: true,
					}
				);
				this.chocolates = this.chocolates.filter(
					(chocolate) => chocolate.id != chocolateId
				);
			} catch (error) {
				console.error("Error deleting chocolate:", error);
			}
		},
		getChocolateImage(imagePath) {
			return `http://localhost:3000/${imagePath.replace(/\\/g, "/")}`;
		},
		async updateQuantity(chocolateId, quantity) {
			try {
				await axios.put(
					`http://localhost:3000/rest/chocolates/update-quantity/${chocolateId}`,
					{ chocolateId, quantity, factoryId: this.factoryId },
					{
						withCredentials: true,
					}
				);
				alert("Quantity updated successfully");
			} catch (error) {
				console.error("Error updating quantity:", error);
			}
		},

		editChocolate(chocolateId) {
			this.$router.push(`/edit-chocolate/${chocolateId}`);
		},
		addChocolate() {
			this.$router.push(`/add-chocolate/${this.factoryId}`);
		},
		async addToCart(chocolate, quantity) {
			if (quantity > chocolate.quantity) {
				alert("Quantity exceeds stock available");
				return;
			}
			try {
				const response = await axios.post(
					"http://localhost:3000/rest/cart/add",
					{ chocolateId: chocolate.id, quantity, factoryId: this.factoryId },
					{ withCredentials: true }
				);
				if (response.status === 201) {
					alert(`Added ${quantity} of ${chocolate.name} to cart`);
					chocolate.quantity -= quantity;
				}
			} catch (error) {
				console.error("Error adding to cart:", error);
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
