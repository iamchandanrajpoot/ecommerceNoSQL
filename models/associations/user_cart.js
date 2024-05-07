const Cart = require("../cart");
const User = require("../user");

User.hasOne(Cart, {foreignKey: "userId"});
Cart.belongsTo(User, {foreignKey: "userId"})