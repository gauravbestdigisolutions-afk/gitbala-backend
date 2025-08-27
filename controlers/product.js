import Product from "../models/product.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc    Add or Update Product by name
// @route   POST /api/products/add
export const addOrUpdateProduct = async (req, res) => {
  const { name, description, price, discount, category, subCategory, stock, attributes } = req.body;
  let images = [];

  try {
    // Handle uploaded images
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
        images.push(result.secure_url);
      }
    }

    // Check if product exists
    let product = await Product.findOne({ name });

    if (product) {
      // Update existing product
      product.description = description || product.description;
      product.price = price || product.price;
      product.discount = discount || product.discount;  // 👈 discount update
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.stock = stock || product.stock;
      product.attributes = attributes || product.attributes;

      // Append new images if uploaded
      if (images.length > 0) {
        product.images = [...product.images, ...images];
      }

      await product.save();

      const finalPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      return res.status(200).json({ message: "Product updated", product, finalPrice });
    }

    // Add new product
    product = new Product({ name, description, price, discount, category, subCategory, stock, attributes, images });
    await product.save();

    const finalPrice = discount
      ? price - (price * discount) / 100
      : price;

    res.status(201).json({ message: "Product added", product, finalPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    // Add finalPrice in each product response
    const productsWithFinal = products.map((p) => ({
      ...p.toObject(),
      finalPrice: p.discount ? p.price - (p.price * p.discount) / 100 : p.price,
    }));

    res.status(200).json(productsWithFinal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by name
// @route   GET /api/products/:name
export const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const finalPrice = product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;

    res.status(200).json({ ...product.toObject(), finalPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// @route   DELETE /api/products/product/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        // Extract public_id from URL
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }

    // Delete product from DB
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};