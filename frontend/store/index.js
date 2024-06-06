import { createStore } from "vuex";

export default createStore({
	state: {
		user: null,
		role: null,
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
			state.role = user.role;
		},
		clearUser(state) {
			state.user = null;
			state.role = null;
		},
	},
	actions: {
		login({ commit }, user) {
			commit("setUser", user);
		},
		logout({ commit }) {
			commit("clearUser");
		},
	},
	getters: {
		isAuthenticated: (state) => !!state.user,
		userRole: (state) => state.role,
	},
});
