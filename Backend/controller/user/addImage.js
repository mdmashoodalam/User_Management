const Users = require("../../model/users"); // Importing the Users model

// Controller function to add or update a user's profile image
const addImage = async (req, res) => {
  const { email, url } = req.body; // Destructuring email and image URL from the request body
  
  // Updating the user's profile picture based on the email
  Users.findOneAndUpdate({ email }, { profilePic: url })
    .catch((error) => {
      res.status(400).send({ message: "Image adding failed." }); // Sending error message if the update fails
    });
  
  const updatedUser = await Users.findOne({ email }); // Fetching the updated user from the database
  res.json({ updatedUser }); // Sending the updated user data in the response
};

module.exports = addImage; // Exporting the addImage function
