const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// associations
require("./models/associations/user_product");
require("./models/associations/user_cart");
require("./models/associations/cart_product");
require("./models/associations/user_order");
require("./models/associations/oder_product");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use()

app.use(errorController.get404);
sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    console.log("Databasse synced");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
