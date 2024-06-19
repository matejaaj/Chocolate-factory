<template>
	<div>
		<h2>View Users</h2>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Username</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Gender</th>
					<th>Birth Date</th>
					<th>Role</th>
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
		};
	},
	created() {
		this.fetchUsers();
	},
	methods: {
		async fetchUsers() {
			try {
				const response = await axios.get("http://localhost:3000/rest/users", {
					withCredentials: true,
				});
				this.users = response.data;
			} catch (error) {
				console.error("Error fetching users:", error);
			}
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
/* Add your styles here */
</style>
