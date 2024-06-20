<template>
	<div class="header">
		<div class="logo">
			<h1>Chocolate Factory</h1>
		</div>
		<div class="auth">
			<span v-if="isAuthenticated && isCustomer" @click="navigateToCart" class="cart">
				<img src="@/assets/cart.png" alt="Cart" />
				Cart
			</span>
			<span @click="handleAuth">{{ isAuthenticated ? "Logout" : "Prijava" }}</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { onMounted, ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import auth from "../services/auth"; // Import the auth module

export default {
	name: "LoginHeader",
	setup() {
		const router = useRouter();
		const isCustomer = ref(false);
		const isAuthenticated = computed(() => auth.state.isAuthenticated);

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
					isCustomer.value = false;
					router.push("/login");
				} catch (error) {
					console.error("Error during logout:", error);
				}
			} else {
				router.push("/login");
			}
		};

		const navigateToCart = () => {
			router.push("/cart");
		};

		const checkIfCustomer = async () => {
			try {
				const response = await axios.get("http://localhost:3000/auth/role", {
					withCredentials: true,
				});
				if (response.data.role === 'CUSTOMER') {
					isCustomer.value = true;
				} else {
					isCustomer.value = false;
				}
			} catch (error) {
				console.error("Error checking user role:", error);
				isCustomer.value = false;
			}
		};

		onMounted(async () => {
			await auth.checkAuth();
			if (auth.state.isAuthenticated) {
				await checkIfCustomer();
			}
		});

		watchEffect(async () => {
			if (isAuthenticated.value) {
				await checkIfCustomer();
			}
		});

		return {
			isAuthenticated,
			isCustomer,
			handleAuth,
			navigateToCart,
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

.auth {
	display: flex;
	align-items: center;
}

.auth span {
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 10px;
}

.auth .cart img {
	width: 24px;
	height: 24px;
	margin-right: 5px;
}
</style>
