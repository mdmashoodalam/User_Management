const Users = require("../../model/users"); // Importing the Users model to interact with the user collection in the database

// Controller function to retrieve all users from the database
const allUsers = async (req, res) => {
  try {
    const allUsers = await Users.find(); // Fetching all users from the Users collection
    res.json({ allUsers }); // Sending the retrieved users as a JSON response
  } catch (error) {
    // Error handling in case fetching users fails
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

module.exports = allUsers; // Exporting the allUsers function for use in the routes
