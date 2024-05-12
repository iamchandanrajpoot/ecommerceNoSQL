const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const { connectDB } = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// connectDB(() => {
//   app.listen(4000, () => {
//     console.log("App is running on http://localhost:4000");
//   });
// });

mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then((result) => {
    app.listen(4000, () => {
      console.log("App is running on http://localhost:4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
