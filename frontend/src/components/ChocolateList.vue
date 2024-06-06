<template>
	<div>
		<h2>Chocolates</h2>
		<div v-if="isManager">
			<button @click="addChocolate">Add New Chocolate</button>
		</div>
		<table v-if="chocolates.length">
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
					<th v-if="isManager">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="chocolate in chocolates" :key="chocolate.id">
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
					<td>{{ chocolate.quantity }}</td>
					<td v-if="isManager">
						<button @click="editChocolate(chocolate.id)">Edit</button>
						<button @click="deleteChocolate(chocolate.id)">Delete</button>
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
			isManager: false, // Initialize isManager as false
		};
	},
	computed: {
		// Your other computed properties
	},
	created() {
		this.fetchChocolates();
		this.checkIfManager(); // Check if the user is a manager when the component is created
	},
	methods: {
		async fetchChocolates() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/chocolates/chocolates?factoryId=${this.factoryId}`,
					{
						withCredentials: true,
					}
				);
				this.chocolates = response.data;
			} catch (error) {
				console.error("Error fetching chocolates:", error);
			}
		},
		async checkIfManager() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/factories/isManager/${this.factoryId}`,
					{
						withCredentials: true,
					}
				);
				this.isManager = response.data.isManager;
			} catch (error) {
				console.error("Error checking manager status:", error);
			}
		},
		async deleteChocolate(chocolateId) {
			try {
				await axios.delete(
					`http://localhost:3000/rest/chocolates/chocolates/${chocolateId}`,
					{
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
		editChocolate(chocolateId) {
			this.$router.push(`/edit-chocolate/${chocolateId}`);
		},
		addChocolate() {
			this.$router.push(`/add-chocolate/${this.factoryId}`);
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
