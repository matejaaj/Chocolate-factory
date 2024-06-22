const express = require("express");
const ReviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const reviewController = new ReviewController();

router.get("/", authenticateToken, (req, res) => reviewController.getAllReviews(req, res));
router.get("/factory/:factoryId", authenticateToken, (req, res) => reviewController.getReviewsByFactoryId(req, res));
router.post("/", authenticateToken, (req, res) => reviewController.createReview(req, res));
router.put("/:id", authenticateToken, (req, res) => reviewController.updateReviewStatus(req, res));
router.delete("/:id", authenticateToken, (req, res) => reviewController.deleteReview(req, res));
router.put("/approve/:id", authenticateToken, (req, res) => reviewController.approveReview(req, res));
router.put("/reject/:id", authenticateToken, (req, res) => reviewController.rejectReview(req, res));


module.exports = router;
