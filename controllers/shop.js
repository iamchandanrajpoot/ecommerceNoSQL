const Product = require("../models/product");

// const User = require("../models/user");
// const Order = require("../models/oder");

exports.getProducts = (req, res, next) => {
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

// exports.getCart = async (req, res) => {
//   try {
//     const cartProducts = await req.user.getCart();
//     console.log(cartProducts);
//     res.render("shop/cart", {
//       path: "/cart",
//       pageTitle: "Your Cart",
//       products: cartProducts,
//       user: req.user,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postCart = async (req, res) => {
//   const prodId = req.body.productId;
//   try {
//     const product = await Product.findByID(prodId);
//     await req.user.addToCart(product);
//     res.redirect("/cart");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postCartDeleteProduct = async (req, res) => {
//   try {
//     await req.user.updateCart(req.body.productId);
//     res.redirect("/cart");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.postOrder = async (req, res) => {
//   try {
//     await req.user.addOrder();
//     res.redirect("/orders");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.getOrders = async (req, res) => {
//   try {
//     const userOrders = await req.user.getOrders();
//     console.log(userOrders);
//     res.render("shop/orders", {
//       path: "/orders",
//       pageTitle: "My Oders",
//       orders: userOrders,
//       user: req.user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
