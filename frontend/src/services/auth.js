import { reactive } from "vue";
import axios from "axios";

const state = reactive({
	isAuthenticated: false,
	user: null,
});

const setAuthenticated = (status, user = null) => {
	state.isAuthenticated = status;
	state.user = user;
};

const checkAuth = async () => {
	try {
		const response = await axios.get("http://localhost:3000/auth/check-auth", {
			withCredentials: true,
		});
		setAuthenticated(response.data.isAuthenticated, response.data.user);
	} catch (error) {
		console.error("Error checking authentication status:", error);
		setAuthenticated(false, null);
	}
};

export default {
	state,
	setAuthenticated,
	checkAuth,
};
