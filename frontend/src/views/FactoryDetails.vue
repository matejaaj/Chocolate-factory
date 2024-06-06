<template>
	<div v-if="factory">
		<h1>{{ factory.name }}</h1>
		<p><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
		<p><strong>Status:</strong> {{ factory.status }}</p>
		<p><strong>Location:</strong> {{ getLocation(factory.locationId) }}</p>
		<p><strong>Rating:</strong> {{ factory.rating }}</p>
		<img :src="getFactoryLogo(factory.logo)" alt="Factory Logo" /> <br />
		<div v-if="isManager">
			<button @click="addChocolate">Add New Chocolate</button>
		</div>
		<chocolate-list :factoryId="factory.id" />
	</div>
	<div v-else-if="errorMessage">
		<p class="error">{{ errorMessage }}</p>
	</div>
	<div v-else>
		<p>Loading factory details...</p>
	</div>
</template>

<script>
import axios from "axios";
import ChocolateList from "@/components/ChocolateList.vue";
import auth from "../services/auth"; // Import the auth module

export default {
	name: "FactoryDetails",
	components: {
		ChocolateList,
	},
	data() {
		return {
			factory: null,
			locations: [],
			errorMessage: null,
		};
	},
	computed: {
		isManager() {
			console.log("User:", auth.state.user); // Debug log
			return auth.state.user && auth.state.user.role === "MANAGER";
		},
	},
	created() {
		this.fetchFactoryDetails();
		this.fetchLocations();
	},
	methods: {
		async fetchFactoryDetails() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/factories/factories/${this.$route.params.id}`,
					{
						withCredentials: true,
					}
				);
				this.factory = response.data;
			} catch (error) {
				if (error.response && error.response.status === 403) {
					this.errorMessage = "You do not have access to this factory.";
				} else {
					this.errorMessage = "Error fetching factory details.";
				}
			}
		},
		async fetchLocations() {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/locations/locations"
				);
				this.locations = response.data;
			} catch (error) {
				console.error("Error fetching locations:", error);
			}
		},
		getLocation(locationId) {
			const location = this.locations.find((loc) => loc.id == locationId);
			return location
				? `${location.street}, ${location.city}, ${location.postalCode}`
				: "Unknown Location";
		},
		getFactoryLogo(logoPath) {
			try {
				return require(`@/assets/images/${logoPath.split("/").pop()}`);
			} catch (e) {
				console.error(`Image not found: ${logoPath}`);
				return "";
			}
		},
		addChocolate() {
			this.$router.push(`/add-chocolate/${this.factory.id}`);
		},
	},
};
</script>

<style scoped>
img {
	max-width: 200px;
	height: auto;
}
button {
	margin: 20px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
}
.error {
	color: red;
}
</style>
