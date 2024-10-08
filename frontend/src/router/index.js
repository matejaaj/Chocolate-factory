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
import Cart from "@/views/CartView.vue";
import auth from "@/services/auth";
import UserRegister from "@/views/UserRegister.vue";
import OrdersView from "@/views/OrdersView.vue";
import OrderDetailsView from "@/views/OrderDetailsView.vue";
import ManagerOrderView from "@/views/ManagerOrderView.vue";
import RegisterEmployeeView from "@/views/RegisterEmployeeView.vue";
import CreateReviewView from "@/views/CreateReview.vue";
import FactoryCommentsView from "@/views/FactoryCommentsView.vue";
import MyProfileView from "@/views/MyProfileView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import ResetPassword from "@/components/ResetPassword.vue";
import PersonalDetails from "@/components/PersonalDetails.vue";

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
	{
		path: "/register",
		component: UserRegister,
		props: true,
		meta: { requiresAuth: false },
	},
	{
		path: "/cart",
		component: Cart,
		meta: { requiresAuth: true, role: "CUSTOMER" },
	},
	{
		path: "/orders",
		component: OrdersView,
		meta: { requiresAuth: true, role: "CUSTOMER" },
	},
	{
		path: "/order-details/:id",
		component: OrderDetailsView,
		props: true,
	},
	{
		path: "/manager-orders/:id",
		name: "ManagerOrderView",
		component: ManagerOrderView,
	},
	{
		path: "/register-employee",
		component: RegisterEmployeeView,
		meta: { requiresAuth: true, role: "MANAGER" },
	},
	{
		path: "/create-review/:id",
		name: "CreateReviewView",
		component: CreateReviewView,
	},
	{
		path: "/factory-comments/:id",
		name: "FactoryCommentsView",
		component: FactoryCommentsView,
	},
	{
		path: "/profile",
		component: MyProfileView,
		meta: { requiresAuth: true },
	},
	{
		path: "/edit-profile",
		component: EditProfileView,
		meta: { requiresAuth: true },
		children: [
			{
				path: "",
				name: "PersonalDetails",
				component: PersonalDetails,
				meta: { requiresAuth: true },
			},
			{
				path: "reset-password",
				name: "ResetPassword",
				component: ResetPassword,
				meta: { requiresAuth: true },
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
