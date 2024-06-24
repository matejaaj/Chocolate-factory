const CancellationDAO = require("../dao/cancellationDAO");
const Cancellation = require("../model/cancellation");

class CancellationService {
	constructor() {
		this.cancellationDAO = new CancellationDAO();
	}

	getAllCancellations() {
		return this.cancellationDAO.getAll();
	}

	getCancellationsByUserId(userId) {
		return this.cancellationDAO.getByUserId(userId);
	}

	createCancellation(userId, orderId, cancellationDate) {
		const newCancellation = new Cancellation(userId, orderId, cancellationDate);
		return this.cancellationDAO.save(newCancellation);
	}

	isSuspicious(userId) {
		const cancellations = this.cancellationDAO.getByUserId(userId);
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

		const recentCancellations = cancellations.filter(cancellation => cancellation.cancellationDate > oneMonthAgo);
		return recentCancellations.length > 5;
	}
}

module.exports = CancellationService;
