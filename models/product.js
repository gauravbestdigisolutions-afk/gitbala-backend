import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Unique product name
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    subCategory: { type: String },          // New field
    stock: { type: Number, default: 0 },
    images: [{ type: String }],             // Multiple images
    attributes: { type: Object },           // Optional: size, color, etc.
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
