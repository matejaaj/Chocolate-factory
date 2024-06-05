const LocationService = require("../services/locationService");

class LocationController {
  constructor() {
    this.locationService = new LocationService();
  }

  getAllLocations(req, res) {
    const locations = this.locationService.getAllLocations();
    res.json(locations);
  }

  getLocationById(req, res) {
    const location = this.locationService.getLocationById(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  }

  createLocation(req, res) {
    const newLocation = this.locationService.createLocation(req.body);
    res.status(201).json(newLocation);
  }

  updateLocation(req, res) {
    const updatedLocation = this.locationService.updateLocation(req.params.id, req.body);
    if (updatedLocation) {
      res.json(updatedLocation);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  }

  deleteLocation(req, res) {
    const success = this.locationService.deleteLocation(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  }
}

module.exports = LocationController;
