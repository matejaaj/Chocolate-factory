const jwt = require("jsonwebtoken");
const UserService = require("./userService");
const CustomerService = require("./customerService");

class AuthService {
	constructor() {
		this.userService = new UserService();
		this.customerService = new CustomerService();
	}

	login(username, password) {
		const user = this.userService.findUserByUsername(username);
		if (user && user.password === password) {
			console.log("USER BLOCKED STATUS: " + user.isBlocked);
			if (user.isBlocked) {
				return { error: "User is blocked" };
			}
			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
					role: user.role,
					isBlocked: user.isBlocked,
				},
				"your_secret_key",
				{ expiresIn: "1h" } // Token expires in 1 hour
			);

			return {
				token,
				user: { id: user.id, username: user.username, role: user.role },
			};
		}
		return null;
	}

	verifyToken(token) {
		try {
			return jwt.verify(token, "your_secret_key");
		} catch (error) {
			return null;
		}
	}

	async register(userDetails) {
		this.validateUserDetails(userDetails);

		const { username, password, firstName, lastName, gender, birthDate } =
			userDetails;
		const existingUser = await this.userService.findUserByUsername(username);

		if (existingUser) {
			return null;
		}

		let role = "CUSTOMER";

		const newUser = {
			username,
			password,
			firstName,
			lastName,
			gender,
			birthDate,
			role,
		};

		const createdUser = await this.userService.createUser(newUser);

		const newCustomer = this.customerService.createCustomer(createdUser.id);

		return {
			user: createdUser,
			customer: newCustomer,
		};
	}

	validateUserDetails(userDetails) {
		const { username, firstName, lastName, gender, birthDate } = userDetails;

		if (!/^[a-zA-Z0-9]{1,15}$/.test(username)) {
			throw new Error(
				"Username must be alphanumeric and max length of 15 characters."
			);
		}

		if (!/^[a-zA-Z]{1,20}$/.test(firstName)) {
			throw new Error(
				"First name must contain only letters and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z]{1,20}$/.test(lastName)) {
			throw new Error(
				"Last name must contain only letters and max length of 20 characters."
			);
		}

		if (!/^[a-zA-Z]{1,10}$/.test(gender)) {
			throw new Error(
				"Gender must contain only letters and max length of 10 characters."
			);
		}

		if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
			throw new Error("Birth date must be in the format YYYY-MM-DD.");
		}
	}
}

module.exports = AuthService;
