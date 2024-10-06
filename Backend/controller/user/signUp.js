const Users = require("../../model/users"); // Importing the Users model
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing

// Controller function to add a new user
const addUser = async (req, res) => {
  const { name, email, password } = req.body; // Destructuring user data from the request body

  // Checking if the user already exists in the database
  const existingUser = await Users.findOne({ email: email });
  if (existingUser) {
    res.status(400).send({
      message: "User Already existing.", // Sending error message if user exists
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password for security
    const newUser = new Users({
      name,
      email,
      password: hashedPassword, // Creating a new user instance with hashed password
    });
    
    // Saving the new user to the database
    await newUser.save();
    console.log("Added New User"); // Logging the action
    res.json({
      message: "Added User Successfully..!", // Sending success response
      userData: newUser, // Returning the new user data
    });
  }
};

module.exports = addUser; // Exporting the addUser function
