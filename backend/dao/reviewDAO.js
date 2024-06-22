const path = require("path");
const Serializer = require("../serializer/serializer");
const Review = require("../model/review");

class ReviewDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/reviews.csv");
		this.serializer = new Serializer();
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
	}

	getAll() {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		return this.reviews.filter((review) => !review.isDeleted);
	}

	save(review) {
		review.id = this.nextId();
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		this.reviews.push(review);
		this.serializer.toCSV(this.filePath, this.reviews);
		return review;
	}

	getById(reviewId) {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		return this.reviews.find(review => review.id == reviewId && !review.isDeleted);
	}

	getByFactoryId(factoryId) {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		return this.reviews.filter(review => review.factoryId == factoryId && !review.isDeleted);
	}

	nextId() {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		if (this.reviews.length < 1) {
			return 1;
		}
		return Math.max(...this.reviews.map((review) => review.id)) + 1;
	}

	update(review) {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		const index = this.reviews.findIndex((r) => r.id === review.id);
		if (index !== -1) {
			this.reviews[index] = review;
			this.serializer.toCSV(this.filePath, this.reviews);
		}
		return review;
	}

	delete(review) {
		this.reviews = this.serializer.fromCSV(this.filePath, Review);
		const index = this.reviews.findIndex((r) => r.id === review.id);
		if (index !== -1) {
			this.reviews[index].isDeleted = true;
			this.serializer.toCSV(this.filePath, this.reviews);
		}
	}
}

module.exports = ReviewDAO;
