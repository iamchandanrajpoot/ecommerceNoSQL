const Order = require("../models/order");
const Product = require("../models/product");

// const User = require("../models/user");
// const Order = require("../models/oder");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        user: null,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        user: null,
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        user: null,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res) => {
  try {
    // const cartProducts = await req.user.getCart();
    const user = await req.user.populate("cart.items.productId");
    console.log("user in get cart: ", user.cart.items);
    const cartProducts = user.cart.items;
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res) => {
  const prodId = req.body.productId;

  try {
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res) => {
  try {
    const prodId = req.body.productId;
    const result = await req.user.updateCart(prodId);
    console.log(result);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.postOrder = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((i) => {
      return { product: { ...i.productId._doc }, quantity: i.quantity };
    });

    console.log("-----------------------------");
    console.log(products);
    const order = new Order({
      orderItems: products,
      user: {
        username: req.user.username,
        userId: req.user,
      },
    });

    await order.save();
    // empty cart
    await req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findOne({ "user.userId": req.user._id });
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "My Oders",
      orders: orders.orderItems,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
