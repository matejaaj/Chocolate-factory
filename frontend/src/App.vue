<template>
	<div id="app">
		<AppHeader />
		<h1>CHOCOLATE FACTORY APPLICATION</h1>
		<button @click="goToFactories">Factories</button>
		<router-view></router-view>
	</div>
</template>

<script>
import AppHeader from "./components/LoginHeader.vue"; // Update the import

export default {
	name: "App",
	components: {
		AppHeader, // Update the component name
	},
	methods: {
		goToFactories() {
			this.$router.push("/factories");
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
button {
	margin: 20px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
}
</style>
