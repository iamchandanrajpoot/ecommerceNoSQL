const mongoose = require("mongoose");
const Product = require("./product");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (product) {
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
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  try {
    return await this.save();
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.getCart = async function () {
  const productIds = this.cart.items.map((item) => item.productId);
  try {
    const products = await Product.find({ _id: { $in: productIds } });
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
};

userSchema.methods.updateCart = async function (prodId) {
  // delete cart item with given product id
  console.log("produid dg[ jsp goprgoepr");
  console.log(prodId);
  const filteredItems = this.cart.items.filter(
    (cp) => cp.productId.toString() !== prodId.toString()
  );
  const updatedCart = {
    items: filteredItems,
  };
  this.cart = updatedCart;
  try {
    return await this.save();
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// const mongodb = require("mongodb");
// const { getDB } = require("../util/database");

// class User {
//   constructor(username, email, password, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.password = password;
//     this.cart = cart || { items: [] };
//     this._id = id;
//   }
//   async save() {
//     const db = getDB();
//     try {
//       return await db.collection("users").insertOne(this);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async findUserbyID(userId) {
//     const db = getDB();
//     try {
//       return await db
//         .collection("users")
//         .findOne({ _id: new mongodb.ObjectId(userId) });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static async fetchOneUser(user) {
//     const db = getDB();
//     try {
//       return await db.collection("users").findOne({ username: user });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   addToCart(product) {
//   const cartProductIndex = this.cart.items.findIndex((cp) => {
//     return cp.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];

//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: new mongodb.ObjectId(product._id),
//       quantity: newQuantity,
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems,
//   };
//   const db = getDB();
//   try {
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   } catch (error) {
//     console.log(error);
//   }
// }
//   // get cart items
//   async getCart() {
//     const db = getDB();
//     const productIds = this.cart.items.map((item) => item.productId);
//     try {
//       const products = await db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();
//       return products.map((p) => {
//         return {
//           ...p,
//           quantity: this.cart.items.find((i) => {
//             return i.productId.toString() === p._id.toString();
//           }).quantity,
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async updateCart(prodId) {
//     prodId = new mongodb.ObjectId(prodId);
//     const db = getDB();
//     // delete cart item with given product id
//     const remainingItems = this.cart.items.filter(
//       (cp) => cp.productId.toString() !== prodId.toString()
//     );
//     const updatedCart = {
//       items: remainingItems,
//     };
//     try {
//       return await db
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { cart: updatedCart } }
//         );
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async addOrder() {
//     const db = getDB();
//     // add order to orders collection
//     const products = await this.getCart();
//     const order = {
//       items: products,
//       user: {
//         _id: new mongodb.ObjectId(this._id),
//         username: this.username,
//       },
//     };
//     const result = await db.collection("orders").insertOne(order);
//     // clear cart
//     this.cart = { items: [] };
//     await db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: this.cart } }
//       );
//     return result;
//   }

//   async getOrders() {
//     const db = getDB();
//     try {
//       return await db
//         .collection("orders")
//         .find({
//           "user._id": new mongodb.ObjectId(this._id),
//         })
//         .toArray();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = User;

// // module.exports = User;
