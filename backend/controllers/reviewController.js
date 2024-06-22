const ReviewService = require("../services/reviewService");

class ReviewController {
	constructor() {
		this.reviewService = new ReviewService();
	}

	getAllReviews(req, res) {
		res.json(this.reviewService.getAllReviews());
	}

	getReviewsByFactoryId(req, res) {
		const { factoryId } = req.params;
		res.json(this.reviewService.getReviewsByFactoryId(factoryId));
	}

	createReview(req, res) {
		const { orderId, factoryId, userId, text, grade } = req.body;
		const review = this.reviewService.createReview(orderId, factoryId, userId, text, grade);
		res.json(review);
	}

	updateReviewStatus(req, res) {
		const { id } = req.params;
		const { status } = req.body;
		const updatedReview = this.reviewService.updateReviewStatus(id, status);
		if (updatedReview) {
			res.json(updatedReview);
		} else {
			res.status(404).send("Review not found");
		}
	}

	deleteReview(req, res) {
		const { id } = req.params;
		const success = this.reviewService.deleteReview(id);
		if (success) {
			res.status(204).send();
		} else {
			res.status(404).send("Review not found");
		}
	}
}

module.exports = ReviewController;
