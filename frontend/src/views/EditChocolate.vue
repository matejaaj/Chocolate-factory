<template>
    <div>
      <h2>Edit Chocolate</h2>
      <form @submit.prevent="updateChocolate">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="chocolate.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" step="0.01" v-model="chocolate.price" id="price" required />
        </div>
        <div class="form-group">
          <label for="type">Type:</label>
          <input type="text" v-model="chocolate.type" id="type" required />
        </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <input type="text" v-model="chocolate.category" id="category" required />
        </div>
        <div class="form-group">
          <label for="weight">Weight:</label>
          <input type="text" v-model="chocolate.weight" id="weight" required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="chocolate.description" id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="text" v-model="chocolate.image" id="image" required />
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <input type="text" v-model="chocolate.status" id="status" required />
        </div>
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" v-model="chocolate.quantity" id="quantity" required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditChocolate',
    data() {
      return {
        chocolate: {
          name: '',
          price: 0,
          type: '',
          category: '',
          weight: '',
          description: '',
          image: '',
          status: '',
          quantity: ''
        }
      };
    },
    created() {
      this.fetchChocolate();
    },
    methods: {
      async fetchChocolate() {
        try {
          const response = await axios.get(`http://localhost:3000/rest/chocolates/chocolates/${this.$route.params.id}`);
            let chocolate = response.data;
            chocolate.quantity = parseInt(chocolate.quantity.replace(/[\r\n]+/g, '').trim());
            this.chocolate = chocolate;
        } catch (error) {
          console.error('Error fetching chocolate:', error);
        }
      },
      async updateChocolate() {
        try {
          await axios.put(`http://localhost:3000/rest/chocolates/chocolates/${this.$route.params.id}`, this.chocolate);
          this.$router.push(`/factories/${this.chocolate.factoryId}`);
        } catch (error) {
          console.error('Error updating chocolate:', error);
        }
      }
    }
  }
  </script>
  
  <style>
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  label {
    width: 100px; 
    margin-right: 10px;
  }
  
  input, textarea {
    flex: 1;
    padding: 8px;
  }
  
  textarea {
    resize: vertical;
  }
  
  button {
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  