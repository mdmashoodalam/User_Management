const express = require("express");
const app = express();
const cors = require("cors");

// Import the database configuration
require("./config/db");

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: ["https://user-management-zo1r.onrender.com"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Enable credentials for CORS
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data

// Import user routes and register them under the /user endpoint
const userRouter = require("./routes/user");
app.use("/user", userRouter);

// Import admin routes and register them under the /admin endpoint
const admin = require("./routes/admin");
app.use("/admin", admin);

// Load environment variables from .env file
require("dotenv").config();

// Set the port for the server
const PORT = process.env.PORT;

// Start the server and listen on the specified port
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server: " + err); // Log error if server fails to start
  } else {
    console.log("Listening on http://localhost:8000"); // Log success message
  }
});
