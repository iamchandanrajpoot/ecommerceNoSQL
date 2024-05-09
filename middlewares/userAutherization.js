const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret_key = process.env.JWT_SECRET_KEY;

const authorizeUser = (req, res, next) => {
  const token = req.cookies.authToken;

  jwt.verify(token, secret_key, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // console.log(user)

    req.user = await User.findUserbyID(user._id);
    // console.log(req.user)
    next();
  });
};

module.exports = authorizeUser;
