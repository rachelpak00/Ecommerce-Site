const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
  getCartByUserId,
  addToCart,
  removeFromCart,
  editCart,
} = require("../db/cart");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fetch cart information by user ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await getCartByUserId(userId);
    res.json(cartItems);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a product to the cart
router.post("/:userId", async (req, res) => {
  console.log(req.body); 
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const cartItem = await addToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    console.error("Error adding product to cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Remove a product from the cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await removeFromCart(userId, productId);
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit the cart (update the quantity of an item)
router.put("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const updatedCartItem = await editCart(userId, productId, quantity);
    res.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
