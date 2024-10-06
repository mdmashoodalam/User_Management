const Users = require("../../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look for a user with the provided email and role "admin"
    const adminUser = await Users.findOne({ email, role: "admin" });

    if (!adminUser) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (passwordMatch) {
      // Generate a JWT token for the admin
      const token = createToken(adminUser.email);

      return res.status(200).json({
        message: "Admin login successful",
        adminToken: token,
        userData: adminUser,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = loginAuth;
