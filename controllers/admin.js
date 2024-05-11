const Product = require("../models/product");

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
  const { title, imageUrl, price, description } = req.body;
  // Save the product
  try {
    const product = await Product.create({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      userId: req.user,
    });
    console.log(product);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
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
  const prodId = req.body.productId;
  const product = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  };
  Product.findOneAndUpdate({ _id: prodId }, { $set: product })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    // .select("title price") //it is used to select or unselect field of document
    // .populate("userId")//this is used replace references to documents
    // here i want populate user document in each producd document
    .then((products) => {
      console.log(products);
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
