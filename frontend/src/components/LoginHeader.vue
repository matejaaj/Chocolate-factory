<template>
	<div class="header">
		<div class="logo">
			<h1>Chocolate Factory</h1>
		</div>
		<div class="auth">
			<span @click="handleAuth">{{
				isAuthenticated ? "Logout" : "Prijava"
			}}</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import auth from "../services/auth"; // Import the auth module

export default {
	name: "LoginHeader",
	setup() {
		const router = useRouter();

		const handleAuth = async () => {
			if (auth.state.isAuthenticated) {
				try {
					await axios.post(
						"http://localhost:3000/auth/logout",
						{},
						{
							withCredentials: true,
						}
					);
					auth.setAuthenticated(false);
					router.push("/login");
				} catch (error) {
					console.error("Error during logout:", error);
				}
			} else {
				router.push("/login");
			}
		};

		const isAuthenticated = computed(() => auth.state.isAuthenticated);

		onMounted(() => {
			auth.checkAuth();
		});

		return {
			isAuthenticated,
			handleAuth,
		};
	},
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background-color: #f5f5f5;
}

.logo h1 {
	margin: 0;
}

.auth span {
	display: flex;
	align-items: center;
	cursor: pointer;
}
</style>
