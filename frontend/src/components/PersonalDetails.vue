<template>
	<div class="personal-details">
		<button @click="goToResetPassword">Reset Password</button>
		<h2>Personal Details</h2>
		<form @submit.prevent="updateDetails">
			<div>
				<label for="username">Username:</label>
				<input type="text" v-model="user.username" required />
			</div>
			<div>
				<label for="firstName">First Name:</label>
				<input type="text" v-model="user.firstName" required />
			</div>
			<div>
				<label for="lastName">Last Name:</label>
				<input type="text" v-model="user.lastName" required />
			</div>
			<div>
				<label for="gender">Gender:</label>
				<select v-model="user.gender" required>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>
			<div>
				<label for="birthDate">Birth Date:</label>
				<input type="date" v-model="user.birthDate" required />
			</div>
			<button type="submit">Save Changes</button>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<p v-if="successMessage" class="success">{{ successMessage }}</p>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
	name: "PersonalDetails",
	setup() {
		const user = ref({
			username: "",
			firstName: "",
			lastName: "",
			gender: "Male",
			birthDate: "",
		});
		const errorMessage = ref("");
		const successMessage = ref("");
		const router = useRouter();

		const validateUserDetails = (userDetails) => {
			const { username, firstName, lastName, gender, birthDate } = userDetails;

			if (!/^[a-zA-Z0-9]{1,15}$/.test(username)) {
				throw new Error(
					"Username must be alphanumeric and max length of 15 characters."
				);
			}

			if (!/^[a-zA-Z]{1,20}$/.test(firstName)) {
				throw new Error(
					"First name must contain only letters and max length of 20 characters."
				);
			}

			if (!/^[a-zA-Z]{1,20}$/.test(lastName)) {
				throw new Error(
					"Last name must contain only letters and max length of 20 characters."
				);
			}

			if (!/^[a-zA-Z]{1,10}$/.test(gender)) {
				throw new Error(
					"Gender must contain only letters and max length of 10 characters."
				);
			}

			if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
				throw new Error("Birth date must be in the format YYYY-MM-DD.");
			}
		};

		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/users/profile",
					{
						withCredentials: true,
					}
				);
				user.value = response.data;
				console.log("Fetched user profile:", user.value);
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		const updateDetails = async () => {
			errorMessage.value = "";
			successMessage.value = "";

			try {
				validateUserDetails(user.value);

				const response = await axios.put(
					`http://localhost:3000/rest/users/profile`,
					user.value,
					{
						withCredentials: true,
					}
				);
				successMessage.value =
					response.data.message || "Profile updated successfully!";
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

		const goToResetPassword = () => {
			router.push("/edit-profile/reset-password");
		};

		onMounted(() => {
			fetchUserProfile();
		});

		return {
			user,
			errorMessage,
			successMessage,
			updateDetails,
			goToResetPassword,
		};
	},
};
</script>

<style scoped>
.personal-details {
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
