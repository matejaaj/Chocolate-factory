const express = require("express");
const router = express.Router();
const chocolateRoutes = require("./chocolateRoutes");
const customerRoutes = require("./customerRoutes");
const customerTypeRoutes = require("./customerTypeRoutes");
const factoryRoutes = require("./factoryRoutes");
const locationRoutes = require("./locationRoutes");
const managerRoutes = require("./managerRoutes");
const authRoutes = require("./authRoutes");

router.use("/rest/chocolates", chocolateRoutes);
router.use("/rest/customers", customerRoutes);
router.use("/rest/customerTypes", customerTypeRoutes);
router.use("/rest/factories", factoryRoutes);
router.use("/rest/locations", locationRoutes);
router.use("/rest/managers", managerRoutes);
router.use("/auth", authRoutes);

module.exports = router;
