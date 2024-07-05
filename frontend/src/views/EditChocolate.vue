<template>
	<div>
		<h2>Edit Chocolate</h2>
		<form @submit.prevent="updateChocolate">
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
				<input type="file" @change="onFileChange" />
			</div>
			<div class="form-group">
				<label for="status">Status:</label>
				<select v-model="chocolate.status" id="status" required>
					<option value="available">Available</option>
					<option value="not available">Not Available</option>
				</select>
			</div>
			<div class="form-group">
				<label for="quantity">Quantity:</label>
				<input
					type="number"
					v-model="chocolate.quantity"
					id="quantity"
					required
				/>
			</div>
			<button type="submit">Update</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "EditChocolate",
	data() {
		return {
			chocolate: {
				name: "",
				price: 0,
				type: "",
				category: "",
				weight: "",
				description: "",
				image: null,
				status: "available",
				quantity: 0,
				factoryId: this.$route.params.factoryId,
			},
		};
	},
	created() {
		this.fetchChocolate();
	},
	methods: {
		async fetchChocolate() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/chocolates/${this.$route.params.id}`
				);
				let chocolate = response.data;
				chocolate.quantity = parseInt(
					chocolate.quantity.replace(/[\r\n]+/g, "").trim()
				);
				this.chocolate = chocolate;
			} catch (error) {
				console.error("Error fetching chocolate:", error);
			}
		},

		onFileChange(event) {
			const file = event.target.files[0];
			const allowedTypes = ["image/jpeg", "image/png"];
			const maxFileSize = 5 * 1024 * 1024; // 5MB

			if (file) {
				if (!allowedTypes.includes(file.type)) {
					alert("Invalid file type. Only JPEG and PNG are allowed.");
					event.target.value = null; // Reset the input field
					this.chocolate.image = null;
					return;
				}

				if (file.size > maxFileSize) {
					alert("File size exceeds the maximum limit of 5MB.");
					event.target.value = null; // Reset the input field
					this.chocolate.image = null;
					return;
				}

				this.chocolate.image = file;
			} else {
				this.chocolate.image = null;
			}
		},
		async updateChocolate() {
			try {
				const formData = new FormData();
				Object.keys(this.chocolate).forEach((key) => {
					if (key !== "image") {
						formData.append(key, this.chocolate[key]);
					}
				});
				if (this.chocolate.image) {
					formData.append("image", this.chocolate.image);
				}
				formData.append("factoryId", this.chocolate.factoryId); // Add factoryId

				await axios.put(
					`http://localhost:3000/rest/chocolates/${this.$route.params.id}`,
					formData,
					{
						withCredentials: true,
						headers: { "Content-Type": "multipart/form-data" },
					}
				);
				this.$router.push(`/factories/${this.chocolate.factoryId}`);
			} catch (error) {
				console.error("Error updating chocolate:", error);
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
