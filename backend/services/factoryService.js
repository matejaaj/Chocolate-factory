const FactoryDAO = require("../dao/factoryDAO");
const Factory = require("../model/factory");
const ReviewService = require("./reviewService");

class FactoryService {
	constructor() {
		this.factoryDAO = new FactoryDAO();
		this.reviewService = new ReviewService();
	}

	getAllFactories() {
		const factories = this.factoryDAO.getAll();
		return factories.map(factory => this.addAverageRating(factory));
	}

	getFactoryById(id) {
		const factory = this.factoryDAO.getById(id);
		return this.addAverageRating(factory);
	}

	createFactory(data) {
		const newFactory = new Factory(
			data.name,
			data.workingHours,
			"open",
			data.locationId,
			data.logo,
			0
		);
		return this.factoryDAO.save(newFactory);
	}

	updateFactory(id, data) {
		const existingFactory = this.factoryDAO.getById(id);
		if (existingFactory) {
			existingFactory.name = data.name || existingFactory.name;
			existingFactory.location = data.location || existingFactory.location;
			existingFactory.productionCapacity =
				data.productionCapacity || existingFactory.productionCapacity;
			return this.factoryDAO.update(existingFactory);
		}
		return null;
	}

	deleteFactory(id) {
		const existingFactory = this.factoryDAO.getById(id);
		if (existingFactory) {
			this.factoryDAO.delete(existingFactory);
			return true;
		}
		return false;
	}

	addAverageRating(factory) {
		const reviews = this.reviewService.getReviewsByFactoryId(factory.id).filter(review => review.status === "approved");
		const totalGrades = reviews.reduce((sum, review) => sum + review.grade, 0);
		const averageRating = reviews.length > 0 ? totalGrades / reviews.length : 0;
		factory.rating = averageRating;
		return factory;
	}
}

module.exports = FactoryService;
