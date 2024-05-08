const Product = require("../models/product");

// const Product = require("../models/product");
// const User = require("../models/user");

// exports.getLoginPage = (req, res) => {
//   res.render("admin/login", {
//     pageTitle: "login user",
//     path: "/admin/login",
//     user: null
//   });
// };
// exports.getRegisterPage = (req, res) => {
//   res.render("admin/register", {
//     pageTitle: "register user",
//     path: "/admin/register",
//     user:null
//   });
// };

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

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   User.findByPk(req.user.id)
//     .then((userInstance) => {
//       const prodId = req.params.productId;
//       return userInstance.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       if (!products) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: products[0],
//         user: req.user
//       });
//     })
//     .then((err) => {
//       console.log(err);
//     });
// };
// exports.postEditProduct = (req, res) => {
//   console.log("reqbody");
//   console.log(req.body);
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDesc = req.body.description;
//   // Find the user by id
//   User.findByPk(req.user.id)
//     .then((userInstance) => {
//       console.log("userInstance", userInstance);

//       // Find the existing product by id and update its attributes
//       return Product.update(
//         {
//           title: updatedTitle,
//           imageUrl: updatedImageUrl,
//           price: updatedPrice,
//           description: updatedDesc,
//         },
//         {
//           where: {
//             id: prodId,
//             UserId: req.user.id,
//           },
//         }
//       );
//     })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// };

// exports.getProducts = (req, res) => {
//   Product.findAll().then((products) => {
//     res.render("admin/products", {
//       prods: products,
//       pageTitle: "Admin Products",
//       path: "/admin/products",
//       user:req.user
//     });
//   });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.destroy({ where: { id: prodId } })
//     .then(() => {
//       console.log("product deleted successfully!");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
