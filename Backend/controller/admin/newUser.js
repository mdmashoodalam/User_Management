const Users = require("../../model/users"); // Importing the Users model
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing

// Controller function to add a new user
const newUser = async (req, res) => {
  const { name, email, password } = req.body; // Destructuring user data from request body

  const existingUser = await Users.findOne({ email: email }); // Checking if the user already exists
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
    await newUser.save(); // Saving the new user to the database
    console.log("Admin Added New User"); // Logging the action
    res.json({
      message: "Added User Successfully..!", // Sending success response
      userData: newUser,
    });
  }
};

module.exports = newUser; // Exporting the newUser function
