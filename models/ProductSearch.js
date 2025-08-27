import mongoose from "mongoose";

const product = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const ProductSearch = mongoose.model("ProductSearch", product);

export default ProductSearch;
