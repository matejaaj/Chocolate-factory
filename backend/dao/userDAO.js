const path = require("path");
const Serializer = require("../serializer/serializer");
const User = require("../model/user");

class UserDAO {
	constructor() {
		this.filePath = path.join(__dirname, "../resources/data/users.csv");
		this.serializer = new Serializer();
		this.users = this.serializer.fromCSV(this.filePath, User);
	}

	getAll() {
		return this.serializer.fromCSV(this.filePath, User);
	}

	save(user) {
		user.id = this.nextId();
		this.users = this.serializer.fromCSV(this.filePath, User);
		this.users.push(user);
		this.serializer.toCSV(this.filePath, this.users);
		return user;
	}

	nextId() {
		this.users = this.serializer.fromCSV(this.filePath, User);
		if (this.users.length < 1) {
			return 1;
		}
		return Math.max(...this.users.map((u) => u.id)) + 1;
	}

	delete(user) {
		this.users = this.serializer.fromCSV(this.filePath, User);
		const index = this.users.findIndex((u) => u.id === user.id);
		if (index !== -1) {
			this.users.splice(index, 1);
			this.serializer.toCSV(this.filePath, this.users);
		}
	}

	update(user) {
		this.users = this.serializer.fromCSV(this.filePath, User);
		const index = this.users.findIndex((u) => u.id === user.id);
		if (index !== -1) {
			this.users[index] = user;
			this.serializer.toCSV(this.filePath, this.users);
		}
		return user;
	}

	getById(userId) {
		this.users = this.serializer.fromCSV(this.filePath, User);
		return this.users.find((user) => user.id === userId);
	}

	findByUsername(username) {
		this.users = this.serializer.fromCSV(this.filePath, User);
		return this.users.find((user) => user.username === username);
	}
}

module.exports = UserDAO;
