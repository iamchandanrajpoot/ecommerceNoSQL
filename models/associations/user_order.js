const Order = require("../oder");
const User = require("../user");

User.hasMany(Order, {foreignKey: "userId"});
Order.belongsTo(User, {foreignKey: "userId"});