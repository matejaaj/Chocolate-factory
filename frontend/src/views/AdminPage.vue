<template>
	<div>
		<h1>Admin Page</h1>
		<nav>
			<ul>
				<li>
					<router-link to="/admin/create-factory">Create Factory</router-link>
				</li>
				<li><router-link to="/admin/view-users">View Users</router-link></li>
			</ul>
		</nav>
		<router-view></router-view>
		<!-- This will render the nested routes -->
	</div>
</template>

<script>
export default {
	name: "AdminPage",
};
</script>

<style scoped>
nav ul {
	list-style-type: none;
	padding: 0;
}

nav li {
	display: inline;
	margin-right: 10px;
}
</style>
