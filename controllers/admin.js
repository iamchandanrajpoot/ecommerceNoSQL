const Product = require("../models/product");
const mongodb = require("mongodb");

// const Product = require("../models/product");
// const User = require("../models/user");

exports.getLoginPage = (req, res) => {
  res.render("admin/login", {
    pageTitle: "login user",
    path: "/admin/login",
    user: null,
  });
};
exports.getRegisterPage = (req, res) => {
  res.render("admin/register", {
    pageTitle: "register user",
    path: "/admin/register",
    user: null,
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    user: req.user,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const userId = req.user.id;
  // Create a new product
  const product = new Product(title, imageUrl, price, description);
  // Save the product
  try {
    const result = await product.save();
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  // User.findByPk(userId)
  //   .then((userInstance) => {
  //     // Use createUserProduct on the user instance
  //     return userInstance.createProduct({
  //       title,
  //       imageUrl,
  //       price,
  //       description,
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send("Internal Server Error");
  //   });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByID(prodId)
    .then((product) => {
      console.log(product._id);
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res) => {
  console.log(req.body);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const prodId = req.body.productId;

  // update product
  const product = new Product(
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc,
    new mongodb.ObjectId(prodId)
  );

  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getProducts = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      user: req.user,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // delete product
  Product.deleteByID(prodId)
    .then(() => {
      console.log("product deleted successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
