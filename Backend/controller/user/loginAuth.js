const Users = require("../../model/users"); // Importing the Users model
const bcrypt = require("bcrypt"); // Importing bcrypt for password comparison
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for creating tokens

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Signing a new token with the user ID and a secret
}

// Controller function to authenticate user login
const loginAuth = async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from the request body
  const existingUser = await Users.findOne({ email: email }); // Finding the user by email

  if (existingUser) { // If user exists
    const passwordCheck = await bcrypt.compare(password, existingUser.password); // Checking if the provided password matches the stored hashed password
    if (passwordCheck) { // If password is correct
      const token = createToken(existingUser._id); // Creating a JWT token for the user
      res.json({
        userData: existingUser, // Sending the user data
        token // Sending the token
      });
    } else {
      res.status(400).send({
        message: "Wrong Password", // Sending error message for incorrect password
      });
    }
  } else {
    res.status(400).send({
      message: "User not found", // Sending error message if user is not found
    });
  }
};

module.exports = loginAuth; // Exporting the loginAuth function
