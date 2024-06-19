import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Factories from "@/views/Factories.vue";
import FactoryDetails from "@/views/FactoryDetails.vue";
import EditChocolate from "@/views/EditChocolate.vue";
import AddChocolate from "@/views/AddChocolate.vue";
import UserLogin from "@/views/UserLogin.vue";
import AdminPage from "@/views/AdminPage.vue";
import CreateFactory from "@/components/CreateFactory.vue";
import ViewUsers from "@/components/ViewUsers.vue";
import auth from "@/services/auth";

const routes = [
	{ path: "/home", component: HomePage },
	{ path: "/factories", component: Factories },
	{
		path: "/factories/:id",
		component: FactoryDetails,
	},
	{
		path: "/edit-chocolate/:id",
		component: EditChocolate,
		props: true,
		meta: { requiresAuth: true, role: "MANAGER" },
	},
	{
		path: "/add-chocolate/:factoryId",
		component: AddChocolate,
		props: true,
		meta: { requiresAuth: true, role: "MANAGER" },
	},
	{ path: "/login", component: UserLogin },
	{
		path: "/admin",
		component: AdminPage,
		props: true,
		meta: { requiresAuth: true, role: "ADMINISTRATOR" },
		children: [
			{
				path: "create-factory",
				component: CreateFactory,
			},
			{
				path: "view-users",
				component: ViewUsers,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (to.meta.requiresAuth) {
		await auth.checkAuth();
		if (auth.state.isAuthenticated) {
			if (to.meta.role && auth.state.user.role !== to.meta.role) {
				next("/"); // Redirect to home if user does not have required role
			} else {
				next();
			}
		} else {
			next("/login");
		}
	} else {
		next();
	}
});

export default router;
