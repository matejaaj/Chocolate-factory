const express = require("express");
const UserController = require("../controllers/userController");
const authenticateToken = require("../middleware/autenthicateToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

const userController = new UserController();

router.get("/", authenticateToken, isAdmin, (req, res) =>
	userController.getAllUsers(req, res)
);

router.get("/profile", authenticateToken, (req, res) =>
	userController.getUserProfile(req, res)
);

router.put("/:id/block", authenticateToken, isAdmin, (req, res) =>
	userController.blockUser(req, res)
);
router.put("/:id/unblock", authenticateToken, isAdmin, (req, res) =>
	userController.unblockUser(req, res)
);

router.put("/profile", authenticateToken, (req, res) =>
	userController.updateUserDetails(req, res)
);

router.put("/reset-password", authenticateToken, (req, res) =>
	userController.resetPassword(req, res)
);

module.exports = router;
