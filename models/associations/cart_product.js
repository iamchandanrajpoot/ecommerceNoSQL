const Cart = require("../cart");
const CartItem = require("../cart_product");
const Product = require("../product");

Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem});