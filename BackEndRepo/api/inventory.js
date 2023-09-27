const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
    getAllInventory,
    getSpecficInventory,
    updateInventory,
    deleteInventory,
    createInventory,
} = require("../db/inventory");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Fetch all inventory
router.get("/", async (req, res) => {
    try {
      const allInventory = await getAllInventory();
      res.json(allInventory);
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch inventory details for specific product
router.get("/:productid", async (req, res) => {
    try {
      const inventoryId = req.params.id;
      const inventory = await getSpecficInventory(inventoryId);
      if (!inventory) {
        return res.status(404).json({ error: "Inventory not found" });
      }
      res.json(inventory);
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create new inventory entry
router.post("/", async (req, res) => {
    try {
      const newInventory = await createInventory(req.body);
      res.json(newInventory);
    } catch (error) {
      console.error("Error creating new inventory", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update inventory details for a product
router.put("/:productId", async (req, res) => {
    try {
      const { inventoryId } = req.params;
      const inventory = req.body;
  
      const updatedInventory= await updateInventory(inventoryId, inventory);
  
      res.json(updatedInventory);
    } catch (error) {
      console.error("Error updating inventory", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete inventory for a product
router.delete("/:productId", async (req, res) => {
    try {
      const { inventoryId } = req.params;
  
      await deleteInventory(inventoryId);
  
      res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
      console.error("Error deleting inventory", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
module.exports = router;