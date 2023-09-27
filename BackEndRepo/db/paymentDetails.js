const pool = require("./index");

// Fetch all payment details for a user
async function getPaymentDetails(userid) {
  try {
    const { rows } = await pool.query(
      `
        SELECT * FROM payment_details 
        WHERE user_id = $1;`,
      [userid]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// Fetch details of a specific entry by ID
async function fetchDetailsById(paymentDetailsId) {
  try {
    const { rows } = await pool.query(
      `
        SELECT * FROM payment_details 
        WHERE payment_id = $1;`,
      [paymentDetailsId]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Add new payment details
async function createPaymentDetails(newPaymentDetails) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO payment_details (user_id, cardholder_name, card_number, expiration_date, cvv, billing_address, default_payment) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *;
        `,
      [
        newPaymentDetails.user_id,
        newPaymentDetails.cardholder_name,
        newPaymentDetails.card_number,
        newPaymentDetails.expiration_date,
        newPaymentDetails.cvv,
        newPaymentDetails.billing_address,
        newPaymentDetails.default_payment,
      ]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Update payment details
async function updateDetails(paymentDetailsId, paymentDetails) {
  try {
    const validFields = [
      "cardholder_name",
      "card_number",
      "expiration_date",
      "cvv",
      "billing_address",
      "default_payment",
    ];

    const updateFields = [];
    const updateValues = [];
    const updateParameters = [];
    let paramIndex = 1;

    Object.entries(paymentDetails).forEach(([key, value]) => {
      if (validFields.includes(key)) {
        updateFields.push(key);
        updateValues.push(value);
        updateParameters.push(`$${paramIndex}`);
        paramIndex++;
      }
    });

    const setClause = updateFields
      .map((field, index) => `${field} = ${updateParameters[index]}`)
      .join(", ");

    const query = `
      UPDATE payment_details 
      SET ${setClause}
      WHERE payment_id = $${paramIndex}
      RETURNING *;
    `;

    const values = [...updateValues, paymentDetailsId];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("Payment details not available");
    }

    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}


// Delete payment details
async function deleteDetails(paymentDetailsId) {
  try {
    const { rows } = await pool.query(
      `DELETE FROM payment_details WHERE payment_id = $1 RETURNING *;`,
      [paymentDetailsId]
    );
    if (rows.length === 0) {
      throw new Error("Payment details not available");
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

module.exports = {
  getPaymentDetails,
  createPaymentDetails,
  updateDetails,
  deleteDetails,
  fetchDetailsById,
};
