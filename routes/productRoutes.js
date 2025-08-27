import express from "express";
import { searchProducts } from "../controlers/productController.js";


const Searchrouter = express.Router();

// Search route
Searchrouter.get("/search", searchProducts);

export default Searchrouter;
