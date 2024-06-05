<template>
  <div id="app">
    <h2>Managers List</h2>
    <table v-if="managers.length">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Factory</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="manager in managers" :key="manager.id">
          <td>{{ manager.firstName }}</td>
          <td>{{ manager.lastName }}</td>
          <td>{{ manager.username }}</td>
          <td>{{ manager.gender }}</td>
          <td>{{ manager.dob }}</td>
          <td>{{ manager.factory }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No managers found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      managers: []
    };
  },
  created() {
    this.fetchManagers();
  },
  methods: {
    async fetchManagers() {
      try {
        const response = await axios.get('http://localhost:3001/api/managers');
        this.managers = response.data;
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
  }
}
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
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
</style>
