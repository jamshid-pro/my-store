import { Router } from "express";
import {
     addProduct, 
     deleteProduct,
     editProduct, 
     getAddProductPage, 
     getEditProductPage, 
     getHomePage, 
     getOneProduct, 
     getProductsPage 
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import userMiddleware from "../middleware/userMiddleware.js";
const router = Router();


router.get("/", getHomePage);
router.get("/products", getProductsPage);
router.get("/add", authMiddleware, getAddProductPage);
router.post("/add-product", userMiddleware, addProduct);
router.get("/product/:id", getOneProduct);
router.get("/edit-product/:id", getEditProductPage);
router.post("/edit-product/:id", editProduct);
router.post("/delete-product/:id", deleteProduct);

export default router;
