<template>
	<div id="create-factory">
		<h1>Create Factory</h1>
		<form @submit.prevent="submitForm">
			<div>
				<label for="name">Name:</label>
				<input type="text" v-model="factory.name" required />
			</div>
			<div>
				<label for="workingHoursOpen">Working Hours Open:</label>
				<input type="time" v-model="factory.workingHours.open" required />
			</div>
			<div>
				<label for="workingHoursClose">Working Hours Close:</label>
				<input type="time" v-model="factory.workingHours.close" required />
			</div>
			<div>
				<label for="logo">Logo:</label>
				<input type="file" @change="onFileChange" required />
			</div>
			<div>
				<label for="location">Location:</label>
				<MapComponent
					:initialLatitude="factory.location.latitude"
					:initialLongitude="factory.location.longitude"
					@updateLocation="updateLocation"
					@updateAddressFields="updateAddressFields"
				/>
				<div v-if="factory.location.latitude && factory.location.longitude">
					<p>Latitude: {{ factory.location.latitude }}</p>
					<p>Longitude: {{ factory.location.longitude }}</p>
				</div>
			</div>
			<div v-if="managers.length">
				<label for="manager">Manager:</label>
				<select v-model="selectedManager" required>
					<option
						v-for="manager in managers"
						:key="manager.id"
						:value="manager.id"
					>
						{{ manager.firstName }} {{ manager.lastName }}
					</option>
				</select>
			</div>
			<div v-else>
				<p>There are no available managers, you have to register a new one.</p>
				<h3>Create New Manager</h3>
				<div>
					<label for="username">Username:</label>
					<input type="text" v-model="newManager.username" required />
				</div>
				<div>
					<label for="password">Password:</label>
					<input type="password" v-model="newManager.password" required />
				</div>
				<div>
					<label for="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						v-model="newManager.confirmPassword"
						required
					/>
				</div>
				<div>
					<label for="firstName">First Name:</label>
					<input type="text" v-model="newManager.firstName" required />
				</div>
				<div>
					<label for="lastName">Last Name:</label>
					<input type="text" v-model="newManager.lastName" required />
				</div>
				<div>
					<label for="gender">Gender:</label>
					<select v-model="newManager.gender" required>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
				<div>
					<label for="birthDate">Birth Date:</label>
					<input type="date" v-model="newManager.birthDate" required />
				</div>
			</div>
			<button type="submit">Create Factory</button>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<p v-if="successMessage" class="success">{{ successMessage }}</p>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MapComponent from "./MapComponent.vue";

export default {
	name: "CreateFactory",
	components: {
		MapComponent,
	},
	setup() {
		const factory = ref({
			name: "",
			workingHours: {
				open: "",
				close: ""
			},
			logo: null,
			location: {
				latitude: 0,
				longitude: 0,
				street: "",
				city: "",
				postalCode: "",
			},
		});
		const managers = ref([]);
		const selectedManager = ref(null);
		const newManager = ref({
			username: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			gender: "",
			birthDate: "",
		});

		const errorMessage = ref("");
		const successMessage = ref("");
		const router = useRouter();

		const fetchManagers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/rest/managers/available-managers",
					{ withCredentials: true }
				);
				managers.value = response.data;
				if (managers.value.length === 0) {
					selectedManager.value = null; // No managers available
				}
			} catch (error) {
				console.error("Error fetching managers:", error);
			}
		};

		const validateFactoryDetails = (factoryDetails) => {
			const {
				name,
				location: { street, city, postalCode },
			} = factoryDetails;

			if (!/^[a-zA-Z]{1,20}$/.test(name)) {
				throw new Error(
					"Factory name must contain only letters and max length of 20 characters."
				);
			}

			if (!/^[a-zA-Z0-9\s]{1,20}$/.test(city)) {
				throw new Error(
					"City must be alphanumeric and max length of 20 characters."
				);
			}

			if (!/^[a-zA-Z0-9\s]{1,20}$/.test(street)) {
				throw new Error(
					"Street must be alphanumeric and max length of 20 characters."
				);
			}

			if (!/^\d{1,10}$/.test(postalCode)) {
				throw new Error(
					"Postal code must contain only numbers and max length of 10 characters."
				);
			}
		};

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

		const onFileChange = (event) => {
			const file = event.target.files[0];
			const allowedTypes = ["image/jpeg", "image/png"];
			const maxFileSize = 5 * 1024 * 1024; // 5MB

			if (file) {
				if (!allowedTypes.includes(file.type)) {
					alert("Invalid file type. Only JPEG and PNG are allowed.");
					event.target.value = null; // Reset the input field
					factory.value.logo = null;
					return;
				}

				if (file.size > maxFileSize) {
					alert("File size exceeds the maximum limit of 5MB.");
					event.target.value = null; // Reset the input field
					factory.value.logo = null;
					return;
				}

				factory.value.logo = file;
			} else {
				factory.value.logo = null;
			}
		};

		const submitForm = async () => {
			errorMessage.value = "";
			successMessage.value = "";

			try {
				if (
					!selectedManager.value &&
					newManager.value.password !== newManager.value.confirmPassword
				) {
					throw new Error("Passwords do not match");
				}

				validateFactoryDetails(factory.value);
				if (!selectedManager.value) {
					validateUserDetails(newManager.value);
				}

				const formData = new FormData();
				const factoryData = {
					name: factory.value.name,
					workingHours: JSON.stringify(factory.value.workingHours),
					status: "open",
					latitude: factory.value.location.latitude,
					longitude: factory.value.location.longitude,
					street: factory.value.location.street,
					city: factory.value.location.city,
					postalCode: factory.value.location.postalCode,
					logo: factory.value.logo,
					rating: 0,
					selectedManagerId: selectedManager.value
						? selectedManager.value
						: "null",
				};

				const managerDetails = {
					username: newManager.value.username,
					password: newManager.value.password,
					confirmPassword: newManager.value.confirmPassword,
					firstName: newManager.value.firstName,
					lastName: newManager.value.lastName,
					gender: newManager.value.gender,
					birthDate: newManager.value.birthDate,
				};

				// Append factory data
				Object.keys(factoryData).forEach((key) => {
					if (factoryData[key] !== null) {
						formData.append(key, factoryData[key]);
					}
				});

				// Append manager details
				Object.keys(managerDetails).forEach((key) => {
					if (managerDetails[key]) {
						formData.append(key, managerDetails[key]);
					}
				});

				const response = await axios.post(
					"http://localhost:3000/rest/factories/",
					formData,
					{
						withCredentials: true,
						headers: { "Content-Type": "multipart/form-data" },
					}
				);

				if (response.status === 201) {
					successMessage.value = "Factory created successfully!";
					setTimeout(() => {
						router.push("/factories");
					}, 1000);
				} else {
					throw new Error("Failed to create factory.");
				}
			} catch (error) {
				console.error("Error creating factory:", error);
				errorMessage.value = error.message;
			}
		};

		const updateLocation = ({ latitude, longitude }) => {
			factory.value.location.latitude = latitude;
			factory.value.location.longitude = longitude;
		};

		const updateAddressFields = (addressFields) => {
			factory.value.location.street = addressFields.street;
			factory.value.location.city = addressFields.city;
			factory.value.location.postalCode = addressFields.postalCode;
		};

		onMounted(() => {
			fetchManagers();

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					const { latitude, longitude } = position.coords;
					factory.value.location.latitude = latitude;
					factory.value.location.longitude = longitude;
				});
			}
		});

		return {
			factory,
			managers,
			selectedManager,
			newManager,
			onFileChange,
			submitForm,
			errorMessage,
			successMessage,
			updateLocation,
			updateAddressFields,
		};
	},
};
</script>

<style>
#create-factory {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

form > div {
	margin: 10px 0;
}

label {
	margin-bottom: 5px;
	font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="time"],
select {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	width: 300px;
}

button {
	padding: 10px 20px;
	margin-top: 10px;
	cursor: pointer;
	background-color: #5cdb95;
	color: white;
	border: none;
	border-radius: 4px;
}

button[type="button"] {
	background-color: #05386b;
}

button[type="submit"] {
	background-color: #379683;
}
</style>
