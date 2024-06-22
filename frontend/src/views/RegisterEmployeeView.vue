<template>
	<div class="register">
		<h2>Register New Employee</h2>
		<form @submit.prevent="registerEmployee">
			<div>
				<label for="username">Username:</label>
				<input type="text" v-model="user.username" required />
			</div>
			<div>
				<label for="password">Password:</label>
				<input type="password" v-model="user.password" required />
			</div>
			<div>
				<label for="confirmPassword">Confirm Password:</label>
				<input type="password" v-model="user.confirmPassword" required />
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
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</div>
			<div>
				<label for="birthDate">Birth Date:</label>
				<input type="date" v-model="user.birthDate" required />
			</div>
			<button type="submit">Register</button>
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
	name: "RegisterEmployeeView",
	setup() {
		const user = ref({
			username: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			gender: "male",
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

		const registerEmployee = async () => {
			errorMessage.value = "";
			successMessage.value = "";

			if (user.value.password !== user.value.confirmPassword) {
				errorMessage.value = "Passwords do not match";
				return;
			}

			try {
				validateUserDetails(user.value);

				const response = await axios.post(
					"http://localhost:3000/auth/register-employee",
					user.value,
					{
						withCredentials: true,
					}
				);

				successMessage.value =
					response.data.message || "Registration successful!";
				setTimeout(() => {
					router.back();
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

		return {
			user,
			errorMessage,
			successMessage,
			registerEmployee,
		};
	},
};
</script>

<style scoped>
.register {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

button {
	margin-top: 10px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
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
