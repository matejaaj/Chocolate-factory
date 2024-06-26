<template>
	<div id="factories">
		<h1>Chocolate Factories</h1>

		<!-- Search and Filter Fields -->
		<div class="search-filter-container">
			<div class="search-field">
				<label>Name:</label>
				<input v-model="search.name" placeholder="Enter Factory Name" />
			</div>
			<div class="search-field">
				<label>Location:</label>
				<input v-model="search.location" placeholder="Enter Location" />
			</div>
			<div class="search-field">
				<label>Rating:</label>
				<input
					type="number"
					v-model.number="search.rating"
					placeholder="Enter Average Rating"
				/>
			</div>
			<div class="search-field">
				<label>Show Only Open Factories:</label>
				<input type="checkbox" v-model="filter.isOpen" />
			</div>
			<div class="search-button">
				<button @click="fetchFactories">Search</button>
			</div>
		</div>

		<table v-if="factories.length">
			<thead>
				<tr>
					<th @click="sortTable('name')">
						Name
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'name' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'name' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th @click="sortTable('location')">
						Location
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'location' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'location' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th>Logo</th>
					<th @click="sortTable('rating')">
						Rating
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'rating' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'rating' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th>Status</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="factory in factories" :key="factory.id">
					<td>{{ factory.name }}</td>
					<td>{{ formatLocation(factory.location) }}</td>
					<td>
						<img :src="getFactoryLogo(factory.logo)" alt="Factory Logo" />
					</td>
					<td>{{ factory.rating }}</td>
					<td>{{ factory.status }}</td>
					<td>
						<button @click="goToFactoryDetails(factory.id)">Details</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No factories found.</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "ChocolateFactories",
	data() {
		return {
			factories: [],
			search: {
				name: "",
				location: "",
				rating: null,
			},
			filter: {
				isOpen: false,
			},
			sort: {
				field: "name",
				order: "asc",
			},
		};
	},
	created() {
		this.fetchFactories();
	},
	methods: {
		async fetchFactories() {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/factories",
					{
						params: {
							name: this.search.name,
							location: this.search.location,
							rating: this.search.rating,
							isOpen: this.filter.isOpen,
							sortField: this.sort.field,
							sortOrder: this.sort.order,
						},
						withCredentials: true,
					}
				);
				this.factories = response.data;
			} catch (error) {
				console.error("Error fetching factories:", error);
			}
		},
		formatLocation(location) {
			return location
				? `${location.street}, ${location.city}, ${location.postalCode}`
				: "Unknown location";
		},
		getFactoryLogo(logoPath) {
			return `http://localhost:3000/${logoPath.replace(/\\/g, "/")}`;
		},
		goToFactoryDetails(factoryId) {
			this.$router.push(`/factories/${factoryId}`);
		},
		sortTable(field) {
			if (this.sort.field === field) {
				this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
			} else {
				this.sort.field = field;
				this.sort.order = "asc";
			}
			this.fetchFactories();
		},
	},
};
</script>

<style>
#factories {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
}
th,
td {
	padding: 10px;
	border: 1px solid #ddd;
}
th {
	background-color: #f4f4f4;
	cursor: pointer;
}
img {
	max-width: 100px;
	height: auto;
}
button {
	padding: 5px 10px;
	cursor: pointer;
}
.search-filter-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 20px;
	gap: 10px;
}
.search-field {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-right: 10px;
}
.search-button {
	display: flex;
	align-items: flex-end;
}
.sort-icons {
	margin-left: 5px;
}
.sort-icons span {
	display: inline-block;
	margin-left: 5px;
	color: #ccc;
}
.sort-icons .active {
	color: #000;
}
</style>
