const express = require("express"); // Importing the express library
const router = express.Router(); // Creating a new router instance

// Importing the necessary controllers for user operations
const loginAuth = require("../controller/user/loginAuth"); // Importing the controller for user login authentication
const addUser = require("../controller/user/signUp"); // Importing the controller for user signup
const addImage = require("../controller/user/addImage"); // Importing the controller for adding user profile images
const userData = require("../controller/user/userData"); // Importing the controller for fetching user data (though not used)
const checkAuth = require("../middleware/checkAuth"); // Importing the middleware to check authorization

// Route for user login
router.post("/login", loginAuth);

// Route to get user data (currently not used as per your comment)
router.get("/data", userData); // Commented: Instead, user data is returned during login

// Route for user signup
router.post("/signup", addUser);

// Route to add a profile image, protected by authorization middleware
router.post("/addImage", checkAuth, addImage);

// Exporting the router for use in the main application
module.exports = router;
