<template>
	<div>
		<div>
			<label for="street">Street:</label>
			<input
				type="text"
				v-model="location.street"
				@input="debouncedUpdateAddress"
				required
			/>
		</div>
		<div>
			<label for="city">City:</label>
			<input
				type="text"
				v-model="location.city"
				@input="debouncedUpdateAddress"
				required
			/>
		</div>
		<div>
			<label for="postalCode">Postal Code:</label>
			<input
				type="text"
				v-model="location.postalCode"
				@input="debouncedUpdateAddress"
				required
			/>
		</div>
		<div id="map" class="map"></div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import axios from "axios";
import debounce from "lodash.debounce";

export default {
	name: "MapComponent",
	emits: ["updateLocation", "updateAddressFields"],
	props: {
		initialLatitude: {
			type: Number,
			required: true,
		},
		initialLongitude: {
			type: Number,
			required: true,
		},
	},
	setup(props, { emit }) {
		const map = ref(null);
		const vectorSource = new VectorSource();
		const location = ref({
			street: "",
			city: "",
			postalCode: "",
			latitude: props.initialLatitude,
			longitude: props.initialLongitude,
		});

		const addIconFeature = (latitude, longitude) => {
			const iconFeature = new Feature({
				geometry: new Point(fromLonLat([longitude, latitude])),
			});

			const iconStyle = new Style({
				image: new Icon({
					src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
				}),
			});
			iconFeature.setStyle(iconStyle);
			vectorSource.clear();
			vectorSource.addFeature(iconFeature);
		};

		const geocodeAddress = async () => {
			const { street, city, postalCode } = location.value;
			const address = `${street}, ${city}, ${postalCode}`;
			try {
				const response = await axios.get(
					"https://nominatim.openstreetmap.org/search",
					{
						params: {
							q: address,
							format: "json",
						},
					}
				);
				if (response.data && response.data.length > 0) {
					const { lat, lon } = response.data[0];
					const latitude = parseFloat(lat);
					const longitude = parseFloat(lon);
					location.value.latitude = latitude;
					location.value.longitude = longitude;
					const coordinates = fromLonLat([longitude, latitude]);
					map.value.getView().setCenter(coordinates);
					map.value.getView().setZoom(15);
					addIconFeature(latitude, longitude);
					emit("updateLocation", { latitude, longitude });
				}
			} catch (error) {
				console.error("Geocoding error:", error);
			}
		};

		const updateAddress = () => {
			emit("updateAddressFields", { ...location.value });
			geocodeAddress();
		};

		const debouncedUpdateAddress = debounce(updateAddress, 500);

		onMounted(() => {
			map.value = new Map({
				target: "map",
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
				],
				view: new View({
					center: fromLonLat([props.initialLongitude, props.initialLatitude]),
					zoom: 12,
				}),
			});

			const vectorLayer = new VectorLayer({
				source: vectorSource,
			});
			map.value.addLayer(vectorLayer);

			map.value.on("click", (event) => {
				const coordinates = event.coordinate;
				const [longitude, latitude] = coordinates;
				location.value.latitude = latitude;
				location.value.longitude = longitude;
				addIconFeature(latitude, longitude);
				emit("updateLocation", { latitude, longitude });
			});

			addIconFeature(props.initialLatitude, props.initialLongitude);
		});

		return {
			location,
			debouncedUpdateAddress,
		};
	},
};
</script>

<style>
.map {
	width: 400px;
	height: 400px;
	margin-top: 20px;
}
</style>
