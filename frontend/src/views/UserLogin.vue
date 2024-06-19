<template>
	<div class="login">
		<h2>Login</h2>
		<form @submit.prevent="handleLogin">
			<div>
				<label for="username">Username:</label>
				<input type="text" v-model="username" required />
			</div>
			<div>
				<label for="password">Password:</label>
				<input type="password" v-model="password" required />
			</div>
			<button type="submit">Login</button>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<p v-if="successMessage" class="success">{{ successMessage }}</p>
		</form>
		<p class="register-link">
			or <a @click.prevent="goToRegister">Register</a>
		</p>
	</div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import auth from "../services/auth"; // Import the auth module

export default {
	name: "UserLogin",
	setup() {
		const username = ref("");
		const password = ref("");
		const errorMessage = ref("");
		const successMessage = ref("");
		const router = useRouter();

		const redirectToRoleBasedPage = (role) => {
			const roleRoutes = {
				MANAGER: "/factories",
				ADMINISTRATOR: "/admin",
				default: "/factories",
			};
			const route = roleRoutes[role] || roleRoutes.default;
			router.push(route);
		};

		const handleLogin = async () => {
			errorMessage.value = "";
			successMessage.value = "";
			try {
				const response = await axios.post(
					"http://localhost:3000/auth/login",
					{
						username: username.value,
						password: password.value,
					},
					{
						withCredentials: true,
					}
				);

				auth.setAuthenticated(true, response.data); // Set the authentication status and user data
				successMessage.value = "Login successful!";

				setTimeout(() => {
					redirectToRoleBasedPage(response.data.role); // Call the redirection method
				}, 1000);
			} catch (error) {
				if (error.response && error.response.status === 401) {
					errorMessage.value = "Invalid username or password";
				} else {
					errorMessage.value = "An error occurred. Please try again later.";
				}
			}
		};

		const goToRegister = () => {
			router.push("/register");
		};

		return {
			username,
			password,
			errorMessage,
			successMessage,
			handleLogin,
			goToRegister,
		};
	},
};
</script>

<style scoped>
.login {
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

.register-link {
	margin-top: 10px;
}

.register-link a {
	color: blue;
	cursor: pointer;
	text-decoration: underline;
}
</style>
