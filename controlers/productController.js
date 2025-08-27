import Product from "../models/product.js";

// 🔍 Search products by name (case-insensitive)
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query || "";

    if (!query.trim()) {
      // Agar query empty hai, saare products return karo
      const allProducts = await Product.find({});
      return res.json(allProducts);
    }

    // MongoDB regex for case-insensitive search on name
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
