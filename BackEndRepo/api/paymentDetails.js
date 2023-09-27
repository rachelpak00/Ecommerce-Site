const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const {
    getPaymentDetails,
    fetchDetailsById,
    createPaymentDetails,
    updateDetails,
    deleteDetails,
} = require("../db/paymentDetails");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fetch all payment details for a specific user
router.get("/user/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const userPaymentDetails = await getPaymentDetails(userid);
    if (!userPaymentDetails) {
      return res.status(404).json({ error: "No payment details available" });
    }
    res.json(userPaymentDetails);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch details of a specific details entry by ID
router.get("/:id", async (req, res) => {
  try {
    const paymentDetailsId = req.params.id;
    const paymentDetails = await fetchDetailsById(paymentDetailsId);
    if (!paymentDetails) {
      return res.status(404).json({ error: "No payment details available" });
    }
    res.json(paymentDetails);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new payment details
router.post("/user/:userId", async (req, res) => {
  try {
    const newPaymentDetails = await createPaymentDetails(req.body);
    res.json(newPaymentDetails);
  } catch (error) {
    console.error("Error adding payment details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update payment details
router.put("/:paymentDetailsId", async (req, res) => {
  try {
    const { paymentDetailsId } = req.params;
    const paymentDetails = req.body;

    const updatedDetails = await updateDetails(paymentDetailsId, paymentDetails);

    res.json(updatedDetails);
  } catch (error) {
    console.error("Error updating payment details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete payment details
router.delete("/:paymentDetailsId", async (req, res) => {
  try {
    const { paymentDetailsId } = req.params;

    await deleteDetails(paymentDetailsId);

    res.json({ message: "Payment details deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
