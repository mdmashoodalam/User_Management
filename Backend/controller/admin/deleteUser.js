const Users = require("../../model/users"); // Importing the Users model to interact with the user collection in the database

// Controller function to delete a user from the database
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params; // Extracting the user ID from the request parameters
    await Users.findByIdAndDelete(_id); // Deleting the user document with the specified ID
    res.json({ message: "Deleted Successfully" }); // Sending a success message in the response
  } catch (error) {
    // Error handling in case the deletion fails
    res.status(400).send({ message: error.message }); // Sending the error message with a 400 status code
  }
};

module.exports = deleteUser; // Exporting the deleteUser function for use in the routes
