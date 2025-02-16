import express from "express";
import { mainController } from "./controllers/mainController.js";
import { productController } from "./controllers/productController.js";
import { catalogController } from "./controllers/catalogController.js";
import { contactController } from "./controllers/contactController.js";
import { loginController } from "./controllers/loginController.js";
import { registerController } from "./controllers/registerController.js";

const router = express.Router();

// * homepage
router.get("/", mainController.homePage);
router.get("/aboutUs", mainController.aboutUsPage);

// * catalog
router.get("/catalog", catalogController.catalogPage);
router.get("/catalog/allFlavor", catalogController.allFlavor);
router.get("/catalog/:idFlavor", catalogController.filterFlavorCatagory);

// * product
router.get("/product/:idCoffee", productController.productPage);

// * login
router.get("/login", loginController.loginPage);
router.post("/login", loginController.handleLogin);
router.get("/logout", loginController.logout);

// * register & user
router.get("/register", registerController.registerPage);
router.post("/register", registerController.handleRegister);

// * contact
router
  .get("/contact", contactController.contactPage)
  .post("/contact", contactController.handleMessage);

export default router;
