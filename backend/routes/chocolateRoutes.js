const express = require("express");
const multer = require("multer");
const path = require("path");
const ChocolateController = require("../controllers/chocolateController");
const authenticateToken = require("../middleware/autenthicateToken");
const isUserManagerofFactory = require("../middleware/isUserManagerOfFactory");
const isEmployeeOfFactory = require("../middleware/isEmployeeOfFactory");
const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/chocolates");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

const chocolateController = new ChocolateController();

router.get("/:id", (req, res) =>
	chocolateController.getChocolateById(req, res)
);

router.post(
	"/",
	authenticateToken,
	upload.single("image"), // Multer middleware to handle file uploads
	isUserManagerofFactory, // Your middleware that needs req.body.factoryId
	(req, res) => {
		chocolateController.createChocolate(req, res);
	}
);

router.put(
	"/:id",
	authenticateToken,
	upload.single("image"), // Multer middleware to handle file uploads
	isUserManagerofFactory, // Your middleware that needs req.body.factoryId
	(req, res) => {
		chocolateController.updateChocolate(req, res);
	}
);

router.delete("/:id", authenticateToken, isUserManagerofFactory, (req, res) => {
	chocolateController.deleteChocolate(req, res);
});

router.put(
	"/update-quantity/:id",
	authenticateToken,
	isEmployeeOfFactory,
	(req, res) => {
		chocolateController.updateChocolateQuantity(req, res);
	}
);

router.get("/", (req, res) => {
	if (req.query.factoryId) {
		return chocolateController.getChocolatesByFactory(req, res);
	}
	return chocolateController.getAllChocolates(req, res);
});

module.exports = router;
