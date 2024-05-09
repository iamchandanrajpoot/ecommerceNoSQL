const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// const secret_key = process.env.JWT_SECRET_KEY

const secret_key = process.env.JWT_SECRET_KEY;
const loginController = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "enter login details first" });
    }
    // get login credentials

    const { username, password } = req.body;
    const user = await User.fetchOneUser(username);

    if (!user) {
      res.status(401).json({ message: "invalid username or password" });
    }

    // compare name and password with password saved in database by bcryt
    if (await bcrypt.compare(password, user.password)) {
      // if user exit in databae with given credentials give him token by jwt
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        secret_key
      );
      // res.json({token})
      console.log(token);
      res.cookie("authToken", token, { maxAge: 3600000, httpOnly: true });
      res.redirect("/admin/products");
    } else {
      res.json({ message: "wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const registerController = async (req, res) => {
  try {
    // hash password before save it on database
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    // save data in database from req body send by user during registeration

    const user = new User(username, email, password);
    const result = await user.save();
    console.log(result);
    res.redirect("/admin/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDashboard = (req, res) => {
  console.log("welcome in dashboad", req.user);
  res.json({ message: "welcome in dashboard" });
};

const logoutController = (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/");
};

module.exports = {
  loginController,
  registerController,
  getDashboard,
  logoutController,
};
