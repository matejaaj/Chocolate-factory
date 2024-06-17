const express = require("express");
const LocationController = require("../controllers/locationController");
const router = express.Router();

const locationController = new LocationController();

router.get("/", (req, res) => locationController.getAllLocations(req, res));
router.get("/:id", (req, res) => locationController.getLocationById(req, res));
router.post("/", (req, res) => locationController.createLocation(req, res));
router.put("/:id", (req, res) => locationController.updateLocation(req, res));
router.delete("/:id", (req, res) =>
	locationController.deleteLocation(req, res)
);

module.exports = router;
