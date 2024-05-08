// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("eshop", "root", "12345678", {
//   host: "localhost",
//   dialect: "mysql",
// });

// module.exports = sequelize;
//  {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_CONNECTION_URI;

const client = new MongoClient(uri);

async function connectDB(cb) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    cb();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
