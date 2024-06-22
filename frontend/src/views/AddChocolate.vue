<template>
	<div>
		<h2>Add New Chocolate</h2>
		<form @submit.prevent="createChocolate">
			<div class="form-group">
				<label for="name">Name:</label>
				<input type="text" v-model="chocolate.name" id="name" required />
			</div>
			<div class="form-group">
				<label for="price">Price:</label>
				<input
					type="number"
					step="0.01"
					v-model="chocolate.price"
					id="price"
					required
				/>
			</div>
			<div class="form-group">
				<label for="type">Type:</label>
				<input type="text" v-model="chocolate.type" id="type" required />
			</div>
			<div class="form-group">
				<label for="category">Category:</label>
				<input
					type="text"
					v-model="chocolate.category"
					id="category"
					required
				/>
			</div>
			<div class="form-group">
				<label for="weight">Weight:</label>
				<input type="text" v-model="chocolate.weight" id="weight" required />
			</div>
			<div class="form-group">
				<label for="description">Description:</label>
				<textarea
					v-model="chocolate.description"
					id="description"
					required
				></textarea>
			</div>
			<div class="form-group">
				<label for="image">Image:</label>
				<input type="text" v-model="chocolate.image" id="image" required />
			</div>
			<div class="form-group">
				<label for="status">Status:</label>
				<select v-model="chocolate.status" id="status" required>
					<option value="available">Available</option>
					<option value="not available">Not Available</option>
				</select>
			</div>
			<button type="submit">Create</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "AddChocolate",
	data() {
		return {
			chocolate: {
				name: "",
				price: 0,
				type: "",
				category: "",
				weight: "",
				description: "",
				image: "",
				status: "available",
				quantity: 0,
				factoryId: this.$route.params.factoryId,
			},
		};
	},
	methods: {
		async createChocolate() {
			try {
				await axios.post(
					"http://localhost:3000/rest/chocolates",
					this.chocolate,
					{
						data: { factoryId: this.factoryId },
						withCredentials: true,
					}
				);
				this.$router.push(`/factories/${this.chocolate.factoryId}`);
			} catch (error) {
				console.error("Error creating chocolate:", error);
			}
		},
	},
};
</script>

<style>
.form-group {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

label {
	width: 100px;
	margin-right: 10px;
}

input,
select,
textarea {
	flex: 1;
	padding: 8px;
}

textarea {
	resize: vertical;
}

button {
	padding: 10px 20px;
	cursor: pointer;
}
</style>
