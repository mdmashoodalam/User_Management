const Users = require("../../model/users");

const editUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, role } = req.body; // Extract name and role from request body

    // Create an object to hold the fields to be updated
    const updateFields = {};
    if (name) {
      updateFields.name = name; // Only update if name is provided
    }
    if (role) {
      updateFields.role = role; // Only update if role is provided
    }

    // Find the user by ID and update the fields
    const updatedUser = await Users.findByIdAndUpdate(_id, updateFields, { new: true });

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User edited successfully.",
      userData: updatedUser, // Return updated user data
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = editUser;
