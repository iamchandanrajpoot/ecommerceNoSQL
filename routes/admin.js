const router = require("express").Router();

const adminController = require("../controllers/admin");
const {
  // loginController,
  // registerController,
  // logoutController,
} = require("../controllers/adminLoginReg");
// const authorizeUser = require("../middlewares/userAutherization");

// const authorizeUser = require("../middlewares/userAuthorization");
// router.get("/login", adminController.getLoginPage);
// router.post("/login", loginController);
// router.get("/register", adminController.getRegisterPage);
// router.post("/register", registerController);
// router.get("/dashboard", authorizeUser,getDashboard);

// router.get("/logout", authorizeUser, logoutController);

// // /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
// authorizeUser,
// /admin/products => GET
router.get("/products", adminController.getProducts);

// // /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get(
  "/edit-product/:productId",

  adminController.getEditProduct
);

router.post("/edit-product", adminController.postEditProduct);

// router.post(
//   "/delete-product",
//   authorizeUser,
//   adminController.postDeleteProduct
// );

module.exports = router;
