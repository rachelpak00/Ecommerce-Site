const pool = require("./index");

// Fetch all promotions
async function getAllPromotions() {
  try {
    const { rows } = await pool.query("SELECT * FROM promotions;");
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// Fetch a promotion by ID
async function fetchPromotionById(promotionId) {
  try {
    const { rows } = await pool.query("SELECT * FROM promotions WHERE promotion_id = $1;", [
      promotionId,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Add a new promotion
async function createPromotion(newPromotion) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO promotions (name, description, start_date, end_date, discount, active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *;
      `,
      [
        newPromotion.name,
        newPromotion.description,
        newPromotion.start_date,
        newPromotion.end_date,
        newPromotion.discount,
        newPromotion.active,
      ]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Update a promotion
async function updatePromotion(promotionId, promotion) {
  try {
    const validFields = [
      "name",
      "description",
      "start_date",
      "end_date",
      "discount",
      "active",
    ];

    const updateFields = [];
    const updateValues = [];
    const updateParameters = [];
    let paramIndex = 1;

    Object.entries(promotion).forEach(([key, value]) => {
      if (validFields.includes(key)) {
        updateFields.push(key);
        updateValues.push(value);
        updateParameters.push(`$${paramIndex}`);
        paramIndex++;
      }
    });

    const query = `
      UPDATE promotions 
      SET ${updateFields.map((field, index) => `${field} = ${updateParameters[index]}`)}
      WHERE promotion_id = $${paramIndex}
      RETURNING *;
    `;

    const values = [...updateValues, promotionId];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("Promotion not found");
    }

    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Delete a promotion
async function deletePromotion(promotionId) {
  try {
    const { rows } = await pool.query(
      `DELETE FROM promotions WHERE promotion_id = $1 RETURNING *;`,
      [promotionId]
    );
    if (rows.length === 0) {
      throw new Error("Promotion not found");
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

module.exports = {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  fetchPromotionById,
};
