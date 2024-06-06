<template>
    <div>
      <h2>Chocolates</h2>
      <table v-if="chocolates.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Category</th>
            <th>Weight</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chocolate in chocolates" :key="chocolate.id">
            <td>{{ chocolate.name }}</td>
            <td>{{ chocolate.price }}</td>
            <td>{{ chocolate.type }}</td>
            <td>{{ chocolate.category }}</td>
            <td>{{ chocolate.weight }}</td>
            <td>{{ chocolate.description }}</td>
            <td><img :src="getChocolateImage(chocolate.image)" alt="Chocolate Image" /></td>
            <td>{{ chocolate.status }}</td>
            <td>{{ chocolate.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>No chocolates found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ChocolateList',
    props: {
      factoryId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        chocolates: []
      };
    },
    created() {
      this.fetchChocolates();
    },
    methods: {
      async fetchChocolates() {
        try {
          const response = await axios.get(`http://localhost:3000/rest/chocolates/chocolates?factoryId=${this.factoryId}`);
          this.chocolates = response.data;
        } catch (error) {
          console.error('Error fetching chocolates:', error);
        }
      },
      getChocolateImage(imagePath) {
        try {
          return require(`@/assets/images/${imagePath.split('/').pop()}`);
        } catch (e) {
          console.error(`Image not found: ${imagePath}`);
          return ''; 
        }
      }
    }
  }
  </script>
  
  <style>
  img {
    max-width: 100px;
    height: auto;
  }
  </style>
  