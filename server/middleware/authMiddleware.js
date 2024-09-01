const jwt = require("jsonwebtoken");
const User = require("../models/User_models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from middleware",jwtToken);

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.TOKEN);
    

    // getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ username: isVerified.username }).select({
      password: 0,
    });
    console.log(userData);

    req.token = token;
    req.user = userData;
    req.user=_id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
  }
};

module.exports = authMiddleware;