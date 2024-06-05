// const express = require("express");
// const serveStatic = require("serve-static");
// const serveIndex = require("serve-index");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 8080;
// const router = require("./routes/route");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/rest/", router);

// app
// 	.use(serveStatic(__dirname + "/static"))
// 	.use(serveIndex(__dirname + "/static"));

// app.listen(port);
// console.log("Server listening at http://localhost:8080");

const path = require("path");
const ManagerDAO = require("./dao/managerDAO");
const Manager = require("./model/manager");

const managerDAO = new ManagerDAO();

// Kreiranje instanci Manager
const managers = [
	new Manager(
		"john_doe",
		"password123",
		"John",
		"Doe",
		"male",
		"1980-01-01",
		"Factory_1"
	),
	new Manager(
		"jane_doe",
		"password456",
		"Jane",
		"Doe",
		"female",
		"1985-05-15",
		"Factory_2"
	),
];
