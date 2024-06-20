<template>
	<div class="container">
		<h2>View Users</h2>

		<!-- Search Fields -->
		<div class="search-container">
			<div class="search-fields">
				<label>
					First Name:
					<input v-model="search.firstName" placeholder="Enter First Name" />
				</label>
				<label>
					Last Name:
					<input v-model="search.lastName" placeholder="Enter Last Name" />
				</label>
				<label>
					Username:
					<input v-model="search.username" placeholder="Enter Username" />
				</label>
			</div>
		</div>

		<!-- Filter Fields -->
		<div class="filter-container">
			<div class="filter-fields">
				<label>
					Role:
					<select v-model="filter.role">
						<option value="">All Roles</option>
						<option value="ADMINISTRATOR">Administrator</option>
						<option value="MANAGER">Manager</option>
						<option value="CUSTOMER">Customer</option>
						<option value="EMPLOYEE">Employee</option>
					</select>
				</label>
			</div>
			<div class="filter-fields" v-if="filter.role === 'CUSTOMER'">
				<label>
					Type:
					<select v-model="filter.type">
						<option value="">All Types</option>
						<option
							v-for="type in customerTypes"
							:key="type.id"
							:value="type.id"
						>
							{{ type.name }}
						</option>
					</select>
				</label>
			</div>
		</div>

		<!-- Search Button -->
		<div class="search-button">
			<button @click="fetchUsers">Search</button>
		</div>

		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th @click="sortTable('username')">
						Username
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'username' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'username' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th @click="sortTable('firstName')">
						First Name
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'firstName' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'firstName' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th @click="sortTable('lastName')">
						Last Name
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'lastName' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'lastName' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th>Gender</th>
					<th>Birth Date</th>
					<th>Role</th>
					<th v-if="filter.role === 'CUSTOMER'">Type</th>
					<th v-if="filter.role === 'CUSTOMER'" @click="sortTable('points')">
						Points
						<span class="sort-icons">
							<span
								:class="{
									active: sort.field === 'points' && sort.order === 'asc',
								}"
								>▲</span
							>
							<span
								:class="{
									active: sort.field === 'points' && sort.order === 'desc',
								}"
								>▼</span
							>
						</span>
					</th>
					<th>Is Blocked</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.username }}</td>
					<td>{{ user.firstName }}</td>
					<td>{{ user.lastName }}</td>
					<td>{{ user.gender }}</td>
					<td>{{ user.birthDate }}</td>
					<td>{{ user.role }}</td>
					<td v-if="filter.role === 'CUSTOMER'">{{ user.customerTypeName }}</td>
					<td v-if="filter.role === 'CUSTOMER'">{{ user.points }}</td>
					<td>
						{{ user.isBlocked ? "Yes" : "No" }}
						<span v-if="user.role !== 'ADMINISTRATOR'">
							<button v-if="!user.isBlocked" @click="blockUser(user.id)">
								Block
							</button>
							<button v-else @click="unblockUser(user.id)">Unblock</button>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "ViewUsers",
	data() {
		return {
			users: [],
			customerTypes: [],
			search: {
				firstName: "",
				lastName: "",
				username: "",
			},
			filter: {
				role: "",
				type: "",
			},
			sort: {
				field: "firstName",
				order: "asc",
			},
		};
	},
	created() {
		this.fetchCustomerTypes();
		this.fetchUsers();
	},
	methods: {
		async fetchCustomerTypes() {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/customerTypes",
					{
						withCredentials: true,
					}
				);
				this.customerTypes = response.data;
			} catch (error) {
				console.error("Error fetching customer types:", error);
			}
		},
		async fetchUsers() {
			try {
				const response = await axios.get("http://localhost:3000/rest/users", {
					params: {
						firstName: this.search.firstName,
						lastName: this.search.lastName,
						username: this.search.username,
						role: this.filter.role,
						type: this.filter.type,
						sortField: this.sort.field,
						sortOrder: this.sort.order,
					},
					withCredentials: true,
				});
				this.users = response.data;
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		},
		sortTable(field) {
			if (this.sort.field === field) {
				this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
			} else {
				this.sort.field = field;
				this.sort.order = "asc";
			}
			this.fetchUsers();
		},
		async blockUser(userId) {
			try {
				await axios.put(
					`http://localhost:3000/rest/users/${userId}/block`,
					{},
					{
						withCredentials: true,
					}
				);
				this.fetchUsers();
			} catch (error) {
				console.error("Error blocking user:", error);
			}
		},
		async unblockUser(userId) {
			try {
				await axios.put(
					`http://localhost:3000/rest/users/${userId}/unblock`,
					{},
					{
						withCredentials: true,
					}
				);
				this.fetchUsers();
			} catch (error) {
				console.error("Error unblocking user:", error);
			}
		},
	},
};
</script>

<style scoped>
.container {
	width: 80%;
	margin: 0 auto;
	text-align: center;
}

.search-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.search-fields {
	display: flex;
	justify-content: center;
	gap: 100px;
	margin-bottom: 10px;
}

.filter-container {
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 20px;
}

.filter-fields {
	margin-right: 200px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.search-fields label,
.filter-fields label {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.search-fields input,
filter-fields select {
	padding: 5px;
	border-radius: 4px;
	border: 1px solid #ccc;
}

.search-button {
	display: flex;
	justify-content: center;
}

button {
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin: 20px 0;
	table-layout: auto;
}

th,
td {
	border: 1px solid #ddd;
	padding: 12px;
	text-align: left;
	white-space: nowrap;
}

th {
	background-color: #f2f2f2;
	cursor: pointer;
}

th .sort-icons {
	display: inline-block;
	margin-left: 5px;
}

th .sort-icons span {
	display: inline-block;
	margin-left: 5px;
	color: #ccc;
}

th .sort-icons .active {
	color: #000;
}
</style>
