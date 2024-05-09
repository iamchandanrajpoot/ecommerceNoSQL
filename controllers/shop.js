const Product = require("../models/product");
// const User = require("../models/user");
// const Order = require("../models/oder");

exports.getProducts = (req, res, next) => {
  console.log("SDf sjkkgfjs");
  Product.fetchAll()
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
  Product.findByID(prodId)
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
  Product.fetchAll()
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
//     const userInstance = await User.findByPk(req.user.id);
//     const cartInstance = await userInstance.getCart();
//     const cartProducts = await cartInstance.getProducts();
//     console.log("tfy ouy uupiip");
//     // console.log(cartProducts);
//     res.render("shop/cart", {
//       path: "/cart",
//       pageTitle: "Your Cart",
//       products: cartProducts,
//       user: req.user
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postCart = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.body.productId);
//     const userInstance = await User.findByPk(req.user.id);
//     let cartInstance = await userInstance.getCart();
//     if (!cartInstance) {
//       cartInstance = await userInstance.createCart();
//     }
//     const productInCartOfGivenId = await cartInstance.getProducts({
//       where: { id: product.id },
//     });
//     let quantity = 0;
//     if (productInCartOfGivenId.length > 0) {
//       quantity = productInCartOfGivenId[0].CartItem.quantity + 1;
//       console.log("product in cart");
//       console.log(productInCartOfGivenId);
//       await cartInstance.addProduct(product, {
//         through: { quantity },
//       });
//     } else {
//       quantity = 1;
//       await cartInstance.addProduct(product, {
//         through: { quantity },
//       });
//     }

//     res.redirect("/cart");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.postCartDeleteProduct = async (req, res) => {
//   try {
//     const userInstance = await User.findByPk(req.user.id);
//     const cartInstance = await userInstance.getCart();

//     const productsToRemoved = await cartInstance.getProducts({
//       where: { id: req.body.productId },
//     });
//     await cartInstance.removeProducts(productsToRemoved);
//     res.redirect("/cart");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.postOrder = async (req, res) => {
//   try {
//     const userInstance = await User.findByPk(req.user.id);
//     const cartInstance = await userInstance.getCart();
//     const itemsInCart = await cartInstance.getProducts();
//     const orderInstance = await Order.create();
//     for (let item of itemsInCart) {
//       let quantity = item.CartItem.quantity;
//       await orderInstance.addProduct(item, { through: { quantity } });
//     }
//     userInstance.addOrder(orderInstance);
//     cartInstance.setProducts(null);
//     res.redirect("/oders");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.getOrders = async (req, res) => {
//   try {
//     const userInstance = await User.findByPk(req.user.id);
//     const orderInstances = await userInstance.getOrders();

//     // oders
//     const userOrders = [];
//     for (let orderInstance of orderInstances) {
//       console.log("oderinsatanc", orderInstance)
//       const orderItems = await orderInstance.getProducts();
//       // console.log(orderItems)
//       userOrders.push(orderItems);
//       console.log("oder",orderItems)
//     }

//     res.render("shop/orders", {
//       path: "/orders",
//       pageTitle: "My Oders",
//       orders: userOrders,
//       user:req.user
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
