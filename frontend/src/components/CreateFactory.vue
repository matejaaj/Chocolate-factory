<template>
	<div id="create-factory">
		<h1>Create Factory</h1>
		<form @submit.prevent="submitForm">
			<div>
				<label for="name">Name:</label>
				<input type="text" v-model="factory.name" required />
			</div>
			<div>
				<label for="workingHours">Working Hours:</label>
				<input type="text" v-model="factory.workingHours" required />
			</div>
			<div>
				<label for="logo">Logo:</label>
				<input type="file" @change="onFileChange" required />
			</div>
			<div>
				<label for="location">Location:</label>
				<div id="map" class="map"></div>
				<div v-if="factory.location.latitude && factory.location.longitude">
					<p>Latitude: {{ factory.location.latitude }}</p>
					<p>Longitude: {{ factory.location.longitude }}</p>
				</div>
				<div>
					<label for="street">Street:</label>
					<input type="text" v-model="factory.location.street" required />
				</div>
				<div>
					<label for="city">City:</label>
					<input type="text" v-model="factory.location.city" required />
				</div>
				<div>
					<label for="postalCode">Postal Code:</label>
					<input type="text" v-model="factory.location.postalCode" required />
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
		</form>
	</div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";

export default {
	name: "CreateFactory",
	setup() {
		const factory = ref({
			name: "",
			workingHours: "",
			logo: null,
			location: {
				latitude: null,
				longitude: null,
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
			try {
				if (
					!selectedManager.value &&
					newManager.value.password !== newManager.value.confirmPassword
				) {
					alert("Passwords do not match");
					return;
				}

				const formData = new FormData();
				const factoryData = {
					name: factory.value.name,
					workingHours: factory.value.workingHours,
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
					alert("Factory created successfully!");
					router.push("/factories");
				} else {
					alert("Failed to create factory.");
				}
			} catch (error) {
				console.error("Error creating factory:", error);
				alert("Failed to create factory.");
			}
		};

		onMounted(() => {
			fetchManagers();

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					const { latitude, longitude } = position.coords;
					factory.value.location.latitude = latitude;
					factory.value.location.longitude = longitude;

					const map = new Map({
						target: "map",
						layers: [
							new TileLayer({
								source: new OSM(),
							}),
						],
						view: new View({
							center: [longitude, latitude],
							zoom: 12,
						}),
					});

					const vectorSource = new VectorSource();
					const vectorLayer = new VectorLayer({
						source: vectorSource,
					});
					map.addLayer(vectorLayer);

					map.on("click", (event) => {
						const coordinates = event.coordinate;
						factory.value.location.latitude = coordinates[1];
						factory.value.location.longitude = coordinates[0];

						const iconFeature = new Feature({
							geometry: new Point(coordinates),
						});

						const iconStyle = new Style({
							image: new Icon({
								src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
							}),
						});
						iconFeature.setStyle(iconStyle);
						vectorSource.clear();
						vectorSource.addFeature(iconFeature);
					});

					const iconFeature = new Feature({
						geometry: new Point([longitude, latitude]),
					});

					const iconStyle = new Style({
						image: new Icon({
							src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
						}),
					});
					iconFeature.setStyle(iconStyle);
					vectorSource.addFeature(iconFeature);
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

.map {
	width: 400px;
	height: 400px;
	margin-top: 20px;
}
</style>
