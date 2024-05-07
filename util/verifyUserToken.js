const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET_KEY;

function verifyUserToken(cb) {
  jwt.verify(token, secret_key, (err, data) => {
    if (er) {
      console.log(er);
      return null;
    }
    cb(data);
  });
}

module.exports = verifyUserToken;
