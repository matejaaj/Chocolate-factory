<template>
	<div class="profile">
		<h2>My Profile</h2>
		<div v-if="user">
			<p><strong>Username:</strong> {{ user.username }}</p>
			<p><strong>First Name:</strong> {{ user.firstName }}</p>
			<p><strong>Last Name:</strong> {{ user.lastName }}</p>
			<p><strong>Gender:</strong> {{ user.gender }}</p>
			<p><strong>Birth Date:</strong> {{ user.birthDate }}</p>
			<p><strong>Role:</strong> {{ user.role }}</p>
			<button @click="editProfile">Edit</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
	name: "MyProfileView",
	setup() {
		const user = ref(null);
		const router = useRouter();

		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/rest/users/profile`,
					{
						withCredentials: true,
					}
				);
				user.value = response.data;
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		const editProfile = () => {
			router.push("/edit-profile");
		};

		onMounted(() => {
			fetchUserProfile();
		});

		return {
			user,
			editProfile,
		};
	},
};
</script>

<style scoped>
.profile {
	margin: 20px;
}
button {
	margin-top: 20px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
}
button:hover {
	background-color: #45a049;
}
</style>
