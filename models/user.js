const mongodb = require("mongodb");
const { getDB } = require("../util/database");

class User {
  constructor(username, email, password, cart, id) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = cart || { items: [] };
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
  // get cart items
  async getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((item) => item.productId);
    try {
      const products = await db
        .collection("products")
        .find({ _id: { $in: productIds } })
        .toArray();
      return products.map((p) => {
        return {
          ...p,
          quantity: this.cart.items.find((i) => {
            return i.productId.toString() === p._id.toString();
          }).quantity,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updateCart(prodId) {
    prodId = new mongodb.ObjectId(prodId);
    const db = getDB();
    // delete cart item with given product id
    const remainingItems = this.cart.items.filter(
      (cp) => cp.productId.toString() !== prodId.toString()
    );
    const updatedCart = {
      items: remainingItems,
    };
    try {
      return await db
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
