<template>
	<div :id="mapId" class="mini-map"></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";

export default {
	name: "MapMini",
	props: {
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
		mapId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const mapElement = ref(null);
		const mapInstance = ref(null);
		const vectorSource = new VectorSource();
		const vectorLayer = new VectorLayer({
			source: vectorSource,
		});

		const initializeMap = () => {
			if (mapInstance.value) return; // Prevent re-initialization
			console.log(
				`MapMini Props - Latitude: ${props.latitude}, Longitude: ${props.longitude}`
			);
			const coordinates = fromLonLat([props.longitude, props.latitude]);

			mapInstance.value = new Map({
				target: mapElement.value,
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
					vectorLayer, // Add the vector layer to the map
				],
				view: new View({
					center: coordinates,
					zoom: 15,
				}),
			});

			addPinToMap(coordinates);
		};

		const addPinToMap = (coordinates) => {
			const iconFeature = new Feature({
				geometry: new Point(coordinates),
			});

			const iconStyle = new Style({
				image: new Icon({
					src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
					scale: 1, // Adjust the scale if needed
				}),
			});

			iconFeature.setStyle(iconStyle);
			vectorSource.clear(); // Clear previous pins
			vectorSource.addFeature(iconFeature);
		};

		onMounted(() => {
			mapElement.value = document.getElementById(props.mapId);
			initializeMap();
		});

		watch(
			() => [props.latitude, props.longitude],
			() => {
				if (mapInstance.value) {
					const coordinates = fromLonLat([props.longitude, props.latitude]);
					mapInstance.value.getView().setCenter(coordinates);
					addPinToMap(coordinates); // Add pin when coordinates change
				}
			}
		);

		return {
			mapElement,
		};
	},
};
</script>

<style>
.mini-map {
	width: 250px;
	height: 250px;
}
</style>
