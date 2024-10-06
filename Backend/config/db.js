const mongoose = require("mongoose"); // Importing mongoose to interact with MongoDB
require("dotenv").config(); // Load environment variables from .env file

mongoose.set("strictQuery", true); // Setting mongoose to enforce strict query mode

// Connecting to MongoDB using the connection string from the environment variable
mongoose.connect(
  process.env.mongoDB_URL, // MongoDB connection string
  {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
  },
  (err) => { // Callback function to handle the connection result
    if (!err) {
      console.log("Database connected..!"); // Log a success message if connected
    } else {
      console.log("Error connecting database: " + err); // Log an error message if there is a connection issue
    }
  }
);
