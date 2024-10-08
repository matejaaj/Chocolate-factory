<template>
	<div v-if="factory" class="factory-details">
		<h1>{{ factory.name }}</h1>
		<p><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
		<p><strong>Status:</strong> {{ factory.status }}</p>
		<p><strong>Location:</strong> {{ getLocation(factory.locationId) }}</p>
		<div class="map-container">
			<MapMini
				:latitude="getLocationLatitude(factory.locationId)"
				:longitude="getLocationLongitude(factory.locationId)"
				:mapId="'map-' + factory.locationId"
			/>
		</div>
		<p><strong>Rating:</strong> {{ factory.rating }}</p>
		<img :src="getFactoryLogo(factory.logo)" alt="Factory Logo" />
		<chocolate-list :factoryId="factory.id" />
		<div>
			<button v-if="isManager" @click="viewFactoryOrders">View Orders</button>
			<button @click="viewFactoryComments">Show Comments</button>
			<button v-if="isManager" @click="viewRegisterEmployee">
				Register employee
			</button>
		</div>
	</div>
	<div v-else>
		<p>Loading factory details...</p>
	</div>
</template>

<script>
import axios from "axios";
import ChocolateList from "@/components/ChocolateList.vue";
import MapMini from "@/components/MapMini.vue"; // Import MapMini component

export default {
	name: "FactoryDetails",
	components: {
		ChocolateList,
		MapMini, // Register MapMini component
	},
	data() {
		return {
			factory: null,
			locations: [],
			isManager: false,
		};
	},
	created() {
		this.fetchFactoryDetails();
		this.fetchLocations();
		this.checkIfManager();
	},
	methods: {
		async fetchFactoryDetails() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/factories/${this.$route.params.id}`,
					{
						withCredentials: true,
					}
				);
				this.factory = response.data;
			} catch (error) {
				console.error("Error fetching factory details:", error);
			}
		},
		async fetchLocations() {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/locations"
				);
				this.locations = response.data;
			} catch (error) {
				console.error("Error fetching locations:", error);
			}
		},
		async checkIfManager() {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/factories/isInFactory/${this.$route.params.id}`,
					{
						withCredentials: true,
					}
				);
				this.isManager = response.data.isManager;
			} catch (error) {
				console.error("Error checking manager status:", error);
			}
		},
		getLocation(locationId) {
			const location = this.locations.find((loc) => loc.id == locationId);
			return location
				? `${location.street}, ${location.city}, ${location.postalCode}`
				: "Unknown Location";
		},
		getLocationLatitude(locationId) {
			const location = this.locations.find((loc) => loc.id == locationId);
			return location ? Number(location.latitude) : 0;
		},
		getLocationLongitude(locationId) {
			const location = this.locations.find((loc) => loc.id == locationId);
			return location ? Number(location.longitude) : 0;
		},
		getFactoryLogo(logoPath) {
			return `http://localhost:3000/${logoPath.replace(/\\/g, "/")}`;
		},
		viewFactoryOrders() {
			this.$router.push(`/manager-orders/${this.factory.id}`);
		},
		viewRegisterEmployee() {
			this.$router.push("/register-employee");
		},
		viewFactoryComments() {
			this.$router.push(`/factory-comments/${this.factory.id}`);
		},
	},
};
</script>

<style>
.factory-details {
	text-align: center;
}

.map-container {
	display: flex;
	justify-content: center;
	margin-top: 10px;
	margin-bottom: 10px;
}

img {
	max-width: 200px;
	height: auto;
}

button {
	padding: 5px 10px;
	cursor: pointer;
}
</style>
