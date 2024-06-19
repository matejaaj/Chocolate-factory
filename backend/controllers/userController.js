const UserService = require("../services/userService");

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	getAllUsers(req, res) {
		try {
			const users = this.userService.getAllUsers();
			res.json(users);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	getUserById(req, res) {
		const user = this.userService.getUserById(req.params.id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	}

	updateUser(req, res) {
		const updatedUser = this.userService.updateUser(req.body);
		if (updatedUser) {
			res.json(updatedUser);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	}

	blockUser(req, res) {
		const blockedUser = this.userService.blockUser(req.params.id);
		if (blockedUser) {
			res.json(blockedUser);
		} else {
			res
				.status(403)
				.json({ message: "User not found or cannot block an administrator" });
		}
	}

	unblockUser(req, res) {
		const unblockedUser = this.userService.unblockUser(req.params.id);
		if (unblockedUser) {
			res.json(unblockedUser);
		} else {
			res
				.status(403)
				.json({ message: "User not found or cannot unblock an administrator" });
		}
	}
}

module.exports = UserController;
