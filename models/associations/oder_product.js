const Order = require("../oder");
const orderItem = require("../order_item");
const Product = require("../product");


Order.belongsToMany(Product, {through: orderItem});
Product.belongsToMany(Order, {through: orderItem});