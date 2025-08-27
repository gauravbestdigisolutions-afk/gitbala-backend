import express from "express";
import { loginAdmin } from "../controlers/adminController.js";


const adminRoutes = express.Router();

// 👤 Admin login
adminRoutes.post("/login",loginAdmin);


export default adminRoutes;
