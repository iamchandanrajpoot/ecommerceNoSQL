// const { MongoClient } = require("mongodb");
// const uri = process.env.MONGO_CONNECTION_URI;
// const dbName = process.env.DB_NAME;
// const client = new MongoClient(uri);

// async function connectDB(cb) {
//   try {
//     await client.connect();

//     console.log("Connected to MongoDB");
//     cb();
//   } catch (error) {
//     console.log(error);
//   }
// }

// function getDB() {
//   return client.db(dbName);
// }
// module.exports = { connectDB, getDB };
