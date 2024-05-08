const { getDB } = require("../util/database");

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  async save() {
    const db = getDB();
    return await db.collection("products").insertOne(this);
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
