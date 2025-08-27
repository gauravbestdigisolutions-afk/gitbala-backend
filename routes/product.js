import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js"; // Multer storage
import { addOrUpdateProduct, deleteProduct, getProductByName, getProducts } from "../controlers/product.js";
import { searchProducts } from "../controlers/productController.js";

const productrouter = express.Router();
const upload = multer({ storage });

// ✅ Add or update product with multiple images
productrouter.post("/add", upload.array("images", 10), addOrUpdateProduct);

// ✅ Get all products
productrouter.get("/product", getProducts);

// ✅ Get single product by name
productrouter.get("/:name", getProductByName);

productrouter.delete("/product/:id", deleteProduct); // 👈 New Delete API

productrouter.get("/search", searchProducts);

export default productrouter;
