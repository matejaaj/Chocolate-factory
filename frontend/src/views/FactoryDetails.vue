<template>
	<div v-if="factory">
		<h1>{{ factory.name }}</h1>
		<p><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
		<p><strong>Status:</strong> {{ factory.status }}</p>
		<p><strong>Location:</strong> {{ getLocation(factory.locationId) }}</p>
		<p><strong>Rating:</strong> {{ factory.rating }}</p>
		<img :src="getFactoryLogo(factory.logo)" alt="Factory Logo" />
		<chocolate-list :factoryId="factory.id" />
	</div>
	<div v-else>
		<p>Loading factory details...</p>
	</div>
</template>

<script>
import axios from "axios";
import ChocolateList from "@/components/ChocolateList.vue";

export default {
	name: "FactoryDetails",
	components: {
		ChocolateList,
	},
	data() {
		return {
			factory: null,
			locations: [],
		};
	},
	created() {
		this.fetchFactoryDetails();
		this.fetchLocations();
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
	},
};
</script>

<style>
img {
	max-width: 200px;
	height: auto;
}
</style>
