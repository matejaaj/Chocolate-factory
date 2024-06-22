const express = require("express");
const multer = require("multer");
const path = require("path");
const FactoryController = require("../controllers/factoryController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/logo");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

const factoryController = new FactoryController();

router.get("/", (req, res) => factoryController.getAllFactories(req, res));

router.post("/", authenticateToken, upload.single("logo"), (req, res) =>
	factoryController.createFactory(req, res)
);

router.get("/:id", (req, res) => {
	factoryController.getFactoryById(req, res);
});

router.delete("/:id", (req, res) => factoryController.deleteFactory(req, res));

router.get("/isInFactory/:factoryId", authenticateToken, (req, res) =>
	factoryController.isUserInFactory(req, res)
);

module.exports = router;
