const express = require("express");
const UserController = require("../controllers/userController");
const authenticateToken = require("../middleware/autenthicateToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

const userController = new UserController();

router.get("/", authenticateToken, isAdmin, (req, res) =>
	userController.getAllUsers(req, res)
);
router.get("/:id", authenticateToken, (req, res) =>
	userController.getUserById(req, res)
);
router.put("/:id", authenticateToken, (req, res) =>
	userController.updateUser(req, res)
);
router.put("/:id/block", authenticateToken, isAdmin, (req, res) =>
	userController.blockUser(req, res)
);
router.put("/:id/unblock", authenticateToken, isAdmin, (req, res) =>
	userController.unblockUser(req, res)
);

module.exports = router;
