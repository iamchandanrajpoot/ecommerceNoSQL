const router = require("express").Router();

const adminController = require("../controllers/admin");
const {
  loginController,
  registerController,
  // logoutController,
} = require("../controllers/adminLoginReg");
const authorizeUser = require("../middlewares/userAutherization");

// const authorizeUser = require("../middlewares/userAuthorization");
router.get("/login", adminController.getLoginPage);
router.post("/login", loginController);
router.get("/register", adminController.getRegisterPage);
router.post("/register", registerController);
// router.get("/dashboard", authorizeUser,getDashboard);

// router.get("/logout", authorizeUser, logoutController);

// private routes
// // /admin/add-product => GET
router.get("/add-product", authorizeUser, adminController.getAddProduct);
// authorizeUser,
// /admin/products => GET
router.get("/products", authorizeUser, adminController.getProducts);

// // /admin/add-product => POST
router.post("/add-product", authorizeUser, adminController.postAddProduct);

router.get(
  "/edit-product/:productId",
  authorizeUser,
  adminController.getEditProduct
);

router.post("/edit-product", authorizeUser, adminController.postEditProduct);

router.post(
  "/delete-product",
  authorizeUser,
  adminController.postDeleteProduct
);

module.exports = router;
