const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
} = require("../db/products");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.json(allProducts);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await fetchProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error("Error creating new user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a product
router.put("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = req.body;

    const updatedProduct = await updateProduct(productId, product);

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    await deleteProduct(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
