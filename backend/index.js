const express = require("express");
const serveStatic = require("serve-static");
const serveIndex = require("serve-index");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;
const router = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app
	.use(serveStatic(__dirname + "/static"))
	.use(serveIndex(__dirname + "/static"));

app.listen(port);
console.log("Server listening at http://localhost:8080");

const AuthService = require("./services/authService");
const authService = new AuthService();
const testUsername = "johndoe";
const testPassword = "password123";
const loginResult = authService.login(testUsername, testPassword);

if (loginResult) {
	console.log("Login test successful:", loginResult);
} else {
	console.log("Login test failed: Invalid credentials");
}
