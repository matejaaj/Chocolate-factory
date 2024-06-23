<template>
	<div>
		<h2>Comments for Factory: {{ factoryName }}</h2>
		<table v-if="comments.length">
			<thead>
				<tr>
					<th>User</th>
					<th>Comment</th>
					<th>Grade</th>
					<th>Status</th>
					<th v-if="isManagerOrAdmin">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="comment in comments" :key="comment.id">
					<td>{{ comment.userName }}</td>
					<td>{{ comment.text }}</td>
					<td>{{ comment.grade }}</td>
					<td>{{ comment.status }}</td>
					<td v-if="isManagerOrAdmin">
						<button @click="approveComment(comment.id)" v-if="comment.status === 'Pending'">Approve</button>
						<button @click="rejectComment(comment.id)" v-if="comment.status === 'Pending'">Reject</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No comments found for this factory.</p>
		</div>
    </div>
	</template>

<script>
import axios from 'axios';

export default {
	name: 'FactoryCommentsView',
	data() {
		return {
			comments: [],
			factoryName: '',
			isManagerOrAdmin: false,
			userRole: ''
		};
	},
	created() {
		this.checkUserRole().then(() => {
			this.fetchFactoryComments();
		});
	},
	methods: {
		async fetchFactoryComments() {
			try {
				const factoryId = this.$route.params.id;
				const factoryResponse = await axios.get(`http://localhost:3000/rest/factories/${factoryId}`, {
					withCredentials: true
				});
				this.factoryName = factoryResponse.data.name;

				const commentsResponse = await axios.get(`http://localhost:3000/rest/reviews/factory/${factoryId}`, {
					withCredentials: true
				});
				let comments = commentsResponse.data;

				if (this.userRole === 'CUSTOMER') {
					comments = comments.filter(comment => comment.status === 'approved');
				}

				const userPromises = comments.map(comment => 
					axios.get(`http://localhost:3000/rest/users/${comment.userId}/getUser`, {
						withCredentials: true
					})
				);
				const userResponses = await Promise.all(userPromises);

				this.comments = comments.map((comment, index) => {
					const user = userResponses[index].data;
					return {
						...comment,
						userName: `${user.firstName} ${user.lastName}`
					};
				});
			} catch (error) {
				console.error('Error fetching factory comments:', error);
			}
		},
		async checkUserRole() {
			try {
				const response = await axios.get('http://localhost:3000/auth/role', {
					withCredentials: true
				});
				const role = response.data.role;
				this.isManagerOrAdmin = role === 'MANAGER' || role === 'ADMINISTRATOR';
				this.userRole = role;
			} catch (error) {
				console.error('Error checking user role:', error);
			}
		},
		async approveComment(commentId) {
			try {
				await axios.put(`http://localhost:3000/rest/reviews/approve/${commentId}`, {}, {
					withCredentials: true
				});
				this.fetchFactoryComments();
			} catch (error) {
				console.error('Error approving comment:', error);
			}
		},
		async rejectComment(commentId) {
			try {
				await axios.put(`http://localhost:3000/rest/reviews/reject/${commentId}`, {}, {
					withCredentials: true
				});
				this.fetchFactoryComments();
			} catch (error) {
				console.error('Error rejecting comment:', error);
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
