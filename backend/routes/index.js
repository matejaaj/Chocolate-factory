const express = require("express");
const router = express.Router();
const administratorRoutes = require("./administratorRoutes");
const chocolateRoutes = require("./chocolateRoutes");
const customerRoutes = require("./customerRoutes");
const customerTypeRoutes = require("./customerTypeRoutes");
const employeeRoutes = require("./employeeRoutes");
const factoryRoutes = require("./factoryRoutes");
const locationRoutes = require("./locationRoutes");
const managerRoutes = require("./managerRoutes");

router.use("/api/administrators", administratorRoutes);
router.use("/api/chocolates", chocolateRoutes);
router.use("/api/customers", customerRoutes);
router.use("/api/customerTypes", customerTypeRoutes);
router.use("/api/employees", employeeRoutes);
router.use("/api/factories", factoryRoutes);
router.use("/api/locations", locationRoutes);
router.use("/api/managers", managerRoutes);

module.exports = router;
