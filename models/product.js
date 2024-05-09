const { getDB } = require("../util/database");
const mongodb = require("mongodb");

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id;
  }
  async save() {
    let db = getDB();
    if (this._id) {
      // update product
      try {
        return await db
          .collection("products")
          .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        return await db.collection("products").insertOne(this);
      } catch (error) {
        console.log(error);
      }
    }
  }
  static async fetchAll() {
    const db = getDB();
    try {
      return await db.collection("products").find().toArray();
    } catch (error) {
      console.log(error);
    }
  }

  static async findByID(prodId) {
    const db = getDB();
    try {
      return await db
        .collection("products")
        .findOne({ _id: new mongodb.ObjectId(prodId) });
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteByID(prodId) {
    const db = getDB();
    try {
      return await db
        .collection("products")
        .deleteOne({ _id: new mongodb.ObjectId(prodId) });
    } catch (error) {
      console.log(error);
    }
  }
}

// const { DataTypes } = require("sequelize");
// const sequelize = require("../util/database");

// const Product = sequelize.define(
//   "Product",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     title:{
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     imageUrl: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

module.exports = Product;
