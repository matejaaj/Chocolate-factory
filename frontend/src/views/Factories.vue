<template>
  <div id="factories">
    <h1>Chocolate Factories</h1>
    <table v-if="factories.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Logo</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="factory in sortedFactories" :key="factory.id">
          <td>{{ factory.name }}</td>
          <td>{{ getLocation(factory.locationId) }}</td>
          <img :src="getFactoryLogo(factory.logo)" alt="Factory Logo" />
          <td>{{ factory.rating }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No factories found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChocolateFactories',
  data() {
    return {
      factories: [],
      locations: []
    };
  },
  created() {
    this.fetchFactories();
    this.fetchLocations();
  },
  computed: {
    sortedFactories() {
      return this.factories.slice().sort(a => a.status === 'open' ? -1 : 1);
    }
  },
  methods: {
    async fetchFactories() {
      try {
        const response = await axios.get('http://localhost:3000/rest/factories/factories');
        this.factories = response.data;
      } catch (error) {
        console.error('Error fetching factories:', error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get('http://localhost:3000/rest/locations/locations');
        this.locations = response.data;
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    getLocation(locationId) {
      const location = this.locations.find(loc => loc.id == locationId);
      return location ? `${location.street}, ${location.city}, ${location.postalCode}` : "Unknown location";
    },
    getFactoryLogo(logoPath) {
      // Pretpostavlja se da su sve slike u src/assets/images
      try {
        return require(`@/assets/images/${logoPath.split('/').pop()}`);
      } catch (e) {
        console.error(`Image not found: ${logoPath}`);
        return ''; // Vratite praznu putanju ako slika nije pronađena
      }
    }
  }
}
</script>

<style>
#factories {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
img {
  max-width: 100px;
  height: auto;
}
</style>
