const Product = require("../product");
const User = require("../user");


User.hasMany(Product, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Product.belongsTo(User, {
  foreignKey: "userId",
});
