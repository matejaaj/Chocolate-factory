<template>
	<div class="reset-password">
		<button @click="goToEditDetails">Edit Details</button>
		<h2>Reset Password</h2>
		<form @submit.prevent="resetPassword">
			<div>
				<label for="oldPassword">Old Password:</label>
				<input type="password" v-model="passwords.oldPassword" required />
			</div>
			<div>
				<label for="newPassword">New Password:</label>
				<input type="password" v-model="passwords.newPassword" required />
			</div>
			<div>
				<label for="confirmPassword">Confirm New Password:</label>
				<input type="password" v-model="passwords.confirmPassword" required />
			</div>
			<button type="submit">Save Changes</button>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<p v-if="successMessage" class="success">{{ successMessage }}</p>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
	name: "ResetPassword",
	setup() {
		const passwords = ref({
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		const errorMessage = ref("");
		const successMessage = ref("");
		const router = useRouter();

		const resetPassword = async () => {
			errorMessage.value = "";
			successMessage.value = "";

			if (passwords.value.newPassword !== passwords.value.confirmPassword) {
				errorMessage.value = "New passwords do not match";
				return;
			}

			try {
				const response = await axios.put(
					`http://localhost:3000/rest/users/reset-password`,
					passwords.value,
					{
						withCredentials: true,
					}
				);
				successMessage.value =
					response.data.message || "Password updated successfully!";
				setTimeout(() => {
					router.push("/profile");
				}, 1000);
			} catch (error) {
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					errorMessage.value = error.response.data.message;
				} else {
					errorMessage.value = "An error occurred. Please try again later.";
				}
			}
		};

		const goToEditDetails = () => {
			router.push("/edit-profile");
		};

		return {
			passwords,
			errorMessage,
			successMessage,
			resetPassword,
			goToEditDetails,
		};
	},
};
</script>

<style scoped>
.reset-password {
	margin: 20px;
}
form {
	display: flex;
	flex-direction: column;
	gap: 10px;
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
.error {
	color: red;
	margin-top: 10px;
}
.success {
	color: green;
	margin-top: 10px;
}
</style>
