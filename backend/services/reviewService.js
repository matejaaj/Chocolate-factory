const ReviewDAO = require("../dao/reviewDAO");
const Review = require("../model/review");
const OrderDAO = require("../dao/orderDAO");

class ReviewService {
	constructor() {
		this.reviewDAO = new ReviewDAO();
		this.orderDAO = new OrderDAO();
	}

	getAllReviews() {
		return this.reviewDAO.getAll();
	}

	getReviewsByFactoryId(factoryId) {
		return this.reviewDAO.getAll().filter(review => review.factoryId == factoryId);
	}

	createReview(orderId, factoryId, userId, text, grade) {
		const newReview = new Review(factoryId, userId, text, grade, "Pending");
		const savedReview = this.reviewDAO.save(newReview);
		
		// Update order to set isReviewed to true
		const order = this.orderDAO.getById(orderId);
		if (order) {
			order.isReviewed = true;
			this.orderDAO.update(order);
		}

		return savedReview;
	}

	updateReviewStatus(reviewId, status) {
		const review = this.reviewDAO.getById(reviewId);
		if (review) {
			review.status = status;
			return this.reviewDAO.update(review);
		}
		return null;
	}

	deleteReview(reviewId) {
		const review = this.reviewDAO.getById(reviewId);
		if (review) {
			this.reviewDAO.delete(review);
			return true;
		}
		return false;
	}
}

module.exports = ReviewService;
