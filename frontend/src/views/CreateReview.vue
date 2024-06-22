<template>
	<div>
		<h2>Create Review for Order {{ orderId }}</h2>
		<form @submit.prevent="submitReview">
			<div>
				<label for="text">Comment:</label>
				<textarea id="text" v-model="review.text" required></textarea>
			</div>
			<div>
				<label for="grade">Rating:</label>
				<select id="grade" v-model="review.grade" required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<button type="submit">Submit Review</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'CreateReview',
	data() {
		return {
			orderId: this.$route.params.id,
			review: {
				text: '',
				grade: 1
			},
			factoryId: null,
			userId: null,
		};
	},
	created() {
		this.fetchOrderDetails();
	},
	methods: {
		async fetchOrderDetails() {
			try {
				const response = await axios.get(`http://localhost:3000/rest/orders/${this.orderId}`, {
					withCredentials: true
				});
				this.factoryId = response.data.factoryId;
				this.userId = response.data.userId;
			} catch (error) {
				console.error('Error fetching order details:', error);
			}
		},
		async submitReview() {
			try {
				const reviewData = {
					orderId: this.orderId,
					factoryId: this.factoryId,
					userId: this.userId,
					text: this.review.text,
					grade: this.review.grade
				};
				console.log('Submitting review with data:', reviewData); // Ispisivanje podataka za proveru

				await axios.post('http://localhost:3000/rest/reviews', reviewData, {
					withCredentials: true
				});
				alert('Review submitted successfully');
				this.$router.push('/orders');
			} catch (error) {
				console.error('Error submitting review:', error);
				alert('Error submitting review');
			}
		}
	}
};
</script>

<style>
button {
	padding: 5px 10px;
	cursor: pointer;
}
</style>
