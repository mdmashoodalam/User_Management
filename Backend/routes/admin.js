const express = require("express"); // Importing the express library
const allUsers = require("../controller/admin/allUsers"); // Importing the controller to get all users
const deleteUser = require("../controller/admin/deleteUser"); // Importing the controller to delete a user
const editUser = require("../controller/admin/editUser"); // Importing the controller to edit a user
const newUser = require("../controller/admin/newUser"); // Importing the controller to add a new user
const loginAuth = require("../controller/admin/loginAuth"); // Importing the controller for admin login authentication
const checkAuth = require("../middleware/checkAuth"); // Importing the middleware to check authorization
const router = express.Router(); // Creating a new router instance

// Route for admin login
router.post("/login", loginAuth);

// Route to get all users, protected by authorization middleware
router.get("/allUsers", checkAuth, allUsers);

// Route to add a new user, protected by authorization middleware
router.post("/addUser", checkAuth, newUser);

// Route to edit a user by ID, protected by authorization middleware
router.put("/edituser/:_id", checkAuth, editUser);

// Route to delete a user by ID, protected by authorization middleware
router.delete("/deleteuser/:_id", checkAuth, deleteUser);

// Exporting the router for use in the main application
module.exports = router;
