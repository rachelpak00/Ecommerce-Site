const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  fetchPromotionById,
} = require("../db/promotions");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fetch all promotions
router.get("/", async (req, res) => {
  try {
    const allPromotions = await getAllPromotions();
    res.json(allPromotions);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a promotion by ID
router.get("/:id", async (req, res) => {
  try {
    const promotionId = req.params.id;
    const promotion = await fetchPromotionById(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.json(promotion);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new promotion
router.post("/", async (req, res) => {
  try {
    const newPromotion = await createPromotion(req.body);
    res.json(newPromotion);
  } catch (error) {
    console.error("Error creating new promotion", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a promotion
router.put("/:promotionId", async (req, res) => {
  try {
    const { promotionId } = req.params;
    const promotion = req.body;

    const updatedPromotion = await updatePromotion(promotionId, promotion);

    res.json(updatedPromotion);
  } catch (error) {
    console.error("Error updating promotion", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a promotion
router.delete("/:promotionId", async (req, res) => {
  try {
    const { promotionId } = req.params;

    await deletePromotion(promotionId);

    res.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Error deleting promotion", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
