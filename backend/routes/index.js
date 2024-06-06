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
const authRoutes = require("./authRoutes"); // Import authRoutes

router.use("/rest/administrators", administratorRoutes);
router.use("/rest/chocolates", chocolateRoutes);
router.use("/rest/customers", customerRoutes);
router.use("/rest/customerTypes", customerTypeRoutes);
router.use("/rest/employees", employeeRoutes);
router.use("/rest/factories", factoryRoutes);
router.use("/rest/locations", locationRoutes);
router.use("/rest/managers", managerRoutes);
router.use("/auth", authRoutes); // Add the auth route

module.exports = router;
