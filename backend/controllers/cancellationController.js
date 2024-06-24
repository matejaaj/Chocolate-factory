const CancellationService = require("../services/cancellationService");

class CancellationController {
	constructor() {
		this.cancellationService = new CancellationService();
	}

	getAllCancellations(req, res) {
		const cancellations = this.cancellationService.getAllCancellations();
		res.json(cancellations);
	}

	createCancellation(req, res) {
		const { userId, orderId, cancellationDate } = req.body;
		const newCancellation = this.cancellationService.createCancellation(userId, orderId, cancellationDate);
		res.json(newCancellation);
	}

	isUserSuspicious(req, res) {
		const userId = req.params.id;
		const isSuspicious = this.cancellationService.isSuspicious(userId);
		res.json({ isSuspicious });
	}
}

module.exports = CancellationController;
