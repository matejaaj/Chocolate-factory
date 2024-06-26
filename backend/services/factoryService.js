const FactoryDAO = require("../dao/factoryDAO");
const Factory = require("../model/factory");
const ReviewService = require("./reviewService");
const LocationService = require("./locationService");

class FactoryService {
	constructor() {
		this.factoryDAO = new FactoryDAO();
		this.reviewService = new ReviewService();
		this.locationService = new LocationService();
	}

	getAllFactories(search = {}, filter = {}, sort = {}) {
		let factories = this.factoryDAO.getAll();
		for (const factory of factories) {
			this.addAverageRating(factory);
			const location = this.locationService.getLocationById(factory.locationId);
			factory.location = location;
		}

		console.log("Initial factories count:", factories.length);

		// Apply search filters
		if (search.name) {
			factories = factories.filter((factory) =>
				factory.name.toLowerCase().includes(search.name.toLowerCase())
			);
		}

		if (search.location) {
			factories = factories.filter((factory) => {
				return (
					factory.location &&
					(factory.location.city
						.toLowerCase()
						.includes(search.location.toLowerCase()) ||
						factory.location.street
							.toLowerCase()
							.includes(search.location.toLowerCase()))
				);
			});
		}
		if (search.rating !== null && search.rating !== undefined) {
			factories = factories.filter(
				(factory) => factory.rating >= search.rating
			);
		}

		console.log(
			"Factories count after applying search filters:",
			factories.length
		);

		// Apply filter for open factories
		if (filter.isOpen) {
			factories = factories.filter((factory) => factory.status === "open");
		}

		console.log(
			"Factories count after applying filter for open factories:",
			factories.length
		);

		// Apply sorting
		if (sort.field) {
			factories.sort((a, b) => {
				let fieldA = a[sort.field];
				let fieldB = b[sort.field];

				// Handle sorting by location
				if (sort.field === "location") {
					fieldA = `${a.location.city}, ${a.location.street}`;
					fieldB = `${b.location.city}, ${b.location.street}`;
				}

				if (fieldA < fieldB) return sort.order === "asc" ? -1 : 1;
				if (fieldA > fieldB) return sort.order === "asc" ? 1 : -1;
				return 0;
			});
		}

		console.log("Factories count after applying sorting:", factories.length);

		return factories;
	}

	getFactoryById(id) {
		const factory = this.factoryDAO.getById(id);
		const reviews = this.reviewService.getReviewsByFactoryId(id);
		const location = this.locationService.getLocationById(factory.locationId);
		const enrichedFactory = this.addAverageRating(factory, reviews);
		enrichedFactory.location = location;
		return enrichedFactory;
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
		const reviews = this.reviewService
			.getReviewsByFactoryId(factory.id)
			.filter((review) => review.status === "approved");
		const totalGrades = reviews.reduce((sum, review) => sum + review.grade, 0);
		const averageRating = reviews.length > 0 ? totalGrades / reviews.length : 0;
		factory.rating = averageRating;
		return factory;
	}
}

module.exports = FactoryService;
