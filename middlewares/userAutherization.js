const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET_KEY;

const authorizeUser = (req, res, next) => {
  const token = req.cookies.authToken;
  // console.log(token)

  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    // console.log(req.user)
    next();
  });
};

module.exports = authorizeUser;
