const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../db/orders");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fetch all orders
router.get("/", async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.json(allOrders);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    res.json(newOrder);
  } catch (error) {
    console.error("Error creating new order", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an order
router.put("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = req.body;

    const updatedOrder = await updateOrder(orderId, order);

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an order
router.delete("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    await deleteOrder(orderId);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
