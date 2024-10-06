const mongoose = require("mongoose"); // Importing the mongoose library

// Defining the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 'name' is required
  },
  email: {
    type: String,
    unique: true, // 'email' must be unique across the collection
    required: true, // 'email' is required
  },
  password: {
    type: String,
    required: true, // 'password' is required
  },
  profilePic: String, // Optional field for user's profile picture
  role: {
    type: String,
    enum: ["user", "admin"], // Define roles as either 'user' or 'admin'
    default: "user", // Default role is 'user'
  },
});

// Creating the Users model from the schema
const Users = mongoose.model("Users", userSchema);

module.exports = Users; // Exporting the Users model for use in other parts of the application
