const UserService = require("../services/userService");

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async getAllUsers(req, res) {
		try {
			const search = {
				firstName: req.query.firstName || "",
				lastName: req.query.lastName || "",
				username: req.query.username || "",
			};
			const filter = {
				role: req.query.role || "",
				type: req.query.type || "",
			};
			const sort = {
				field: req.query.sortField || "firstName",
				order: req.query.sortOrder || "asc",
			};
			const users = this.userService.getAllUsers(search, filter, sort);
			res.json(users);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	// getUserById(req, res) {
	// 	const user = this.userService.getUserById(req.params.id);
	// 	if (user) {
	// 		res.json(user);
	// 	} else {
	// 		res.status(404).json({ message: "User not found" });
	// 	}
	// }

	updateUser(req, res) {
		const updatedUser = this.userService.updateUser(req.body);
		if (updatedUser) {
			res.json(updatedUser);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	}

	async getUserProfile(req, res) {
		try {
			const user = await this.userService.getUserProfile(req.userId);
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
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

	async updateUserDetails(req, res) {
		try {
			const updatedUser = await this.userService.updateUserDetails(
				req.userId,
				req.body
			);
			if (updatedUser) {
				res.json(updatedUser);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			if (error.message === "Username already exists") {
				res.status(409).json({ message: error.message });
			} else {
				res.status(500).json({ message: error.message });
			}
		}
	}

	async resetPassword(req, res) {
		try {
			const { oldPassword, newPassword } = req.body;
			const userId = req.userId;
			const success = await this.userService.resetPassword(
				userId,
				oldPassword,
				newPassword
			);
			if (success) {
				res.json({ message: "Password updated successfully" });
			} else {
				res.status(400).json({ message: "Old password is incorrect" });
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = UserController;
