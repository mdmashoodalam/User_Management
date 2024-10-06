const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library

// Middleware function to check authorization
const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers; // Extracting the authorization header from the request

  // Checking if the authorization header is present
  if (!authorization) {
    return res.status(401).send({ message: "Authorization required" }); // Sending an error if not present
  }
  
  // Extracting the token from the authorization header
  const token = authorization.split(" ")[1];
  
  try {
    // Verifying the token using the JWT secret
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    next(); // Proceeding to the next middleware or route handler if verification is successful
  } catch (error) {
    return res.status(401).send({ message: "Invalid Authorization" }); // Sending an error if token is invalid
  }
};

module.exports = checkAuth; // Exporting the checkAuth middleware
