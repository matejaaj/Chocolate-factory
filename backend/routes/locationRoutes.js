const express = require("express");
const LocationController = require("../controllers/locationController");
const router = express.Router();

const locationController = new LocationController();

router.get("/locations", (req, res) => locationController.getAllLocations(req, res));
router.get("/locations/:id", (req, res) => locationController.getLocationById(req, res));
router.post("/locations", (req, res) => locationController.createLocation(req, res));
router.put("/locations/:id", (req, res) => locationController.updateLocation(req, res));
router.delete("/locations/:id", (req, res) => locationController.deleteLocation(req, res));

module.exports = router;
