const mongodb = require("mongodb");
const { getDB } = require("../util/database");

class User {
  constructor(username, email, password, cart, id) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = cart || { items: [] }; //{items: []}
    this._id = id;
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
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDB();
    try {
      return db
        .collection("users")
        .updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          { $set: { cart: updatedCart } }
        );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;

// module.exports = User;
