const express = require("express");
const OrderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/autenthicateToken");
const router = express.Router();

const orderController = new OrderController();

router.get("/", authenticateToken, (req, res) => orderController.getAllOrders(req, res));
router.get("/:id", authenticateToken, (req, res) => orderController.getOrderById(req, res));
router.get("/user/:userId", authenticateToken, (req, res) => orderController.getOrdersByUserId(req, res));
router.post("/", authenticateToken, (req, res) => orderController.createOrder(req, res)); 
router.put("/:id", authenticateToken, (req, res) => orderController.updateOrder(req, res));
router.delete("/:id", authenticateToken, (req, res) => orderController.deleteOrder(req, res));
router.put("/cancel/:id", authenticateToken, (req, res) => orderController.cancelOrder(req, res));
router.get("/factory/:factoryId", authenticateToken, (req, res) => orderController.getOrdersByFactoryId(req, res));
router.put("/accept/:id", authenticateToken, (req, res) => orderController.acceptOrder(req, res));
router.put("/decline/:id", authenticateToken, (req, res) => orderController.declineOrder(req, res));


module.exports = router;
