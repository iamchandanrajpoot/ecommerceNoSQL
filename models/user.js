const mongodb = require("mongodb");
const { getDB } = require("../util/database");

class User {
  constructor(username, email, password, role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role || "admin";
  }
  async save() {
    const db = getDB();
    try {
      return await db.collection("users").insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async findUserbyID(userId) {
    const db = getDB();
    try {
      return await db
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(userId) });
    } catch (error) {
      console.log(error);
    }
  }
  static async fetchOneUser(user) {
    const db = getDB();
    try {
      return await db.collection("users").findOne({ username: user });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../util/database");

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "user"
//     }
//   },
//   { timestamps: false }
// );
