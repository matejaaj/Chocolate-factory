const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

// CORS configuration
app.use(
	cors({
		origin: "http://localhost:3001", // Replace with your frontend's origin
		credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
	})
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
