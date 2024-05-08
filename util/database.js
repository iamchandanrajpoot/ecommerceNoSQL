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
const dbName = process.env.DB_NAME;
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

function getDB() {
  return client.db(dbName);
}
module.exports = { connectDB, getDB };
