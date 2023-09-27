const pool = require("./index");

// Get all orders for a user
async function getUserOrders(userId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM order_history
      WHERE user_id = $1;
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get details of a specific order by ID
async function getOrderById(orderId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM order_history
      WHERE id = $1;
      `,
      [orderId]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Create new order entry
async function createOrderHistory(newOrderHistory) {
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO order_history (user_id, order_date, payment_id, shipping_address, total, order_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [
        newOrderHistory.user_id,
        newOrderHistory.order_date,
        newOrderHistory.payment_id,
        newOrderHistory.shipping_address,
        newOrderHistory.total,
        newOrderHistory.order_status,
      ]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Update order status
async function updateStatus(orderId, orderDetails) {
    try {
      const validFields = [
        "order_date",
        "shipping_address",
        "total",
        "order_status",
      ];
  
      const updateFields = [];
      const updateValues = [];
      const updateParameters = [];
      let paramIndex = 1;
  
      Object.entries(orderDetails).forEach(([key, value]) => {
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
        UPDATE order_history 
        SET ${setClause}
        WHERE id = $${paramIndex}
        RETURNING *;
      `;
  
      const values = [...updateValues, orderId];
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

module.exports = {
  getUserOrders,
  getOrderById,
  updateStatus,
  createOrderHistory,
};
