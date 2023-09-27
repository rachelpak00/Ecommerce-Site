const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
  getUserOrders,
  getOrderById,
  createOrderHistory,
  updateStatus,
} = require("../db/orderHistory");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create new order entry
router.post("/", async (req, res) => {
  try {
    const newOrderHistory = await createOrderHistory(req.body);
    res.json(newOrderHistory);
  } catch (error) {
    console.error("Error creating new order entry", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all orders for a specific user
router.get("/user/:userid", async (req, res) => {
  try {
    const userId = req.params.userid; 
    const userOrders = await getUserOrders(userId);
    res.json(userOrders);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get details of a specific order by ID
router.get("/:orderid", async (req, res) => {
  try {
    const orderId = req.params.orderid; 
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update order status
router.put("/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderDetails = req.body;
  
      const updatedDetails = await updateStatus(orderId, orderDetails);
  
      res.json(updatedDetails);
    } catch (error) {
      console.error("Error updating payment details", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
