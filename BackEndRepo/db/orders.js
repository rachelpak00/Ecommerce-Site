const pool = require("./index");

// Fetch all orders
async function getAllOrders() {
  try {
    const { rows } = await pool.query("SELECT * FROM orders;");
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// Add a new order
async function createOrder(newOrder) {
  try {
    const {
      user_id,
      order_date,
      total,
      shipping_address,
      billing_address,
      status,
      payment_method,
      shipping_method,
      product_id,
      quantity,
      price,
    } = newOrder;

    const { rows } = await pool.query(
      `
            INSERT INTO orders (
                user_id,
                order_date,
                total,
                shipping_address,
                billing_address,
                status,
                payment_method,
                shipping_method,
                product_id,
                quantity,
                price
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
            `,
      [
        user_id,
        order_date,
        total,
        shipping_address,
        billing_address,
        status,
        payment_method,
        shipping_method,
        JSON.stringify(product_id),
        quantity,
        price,
      ]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Update an order
async function updateOrder(orderId, order) {
  try {
    const {
      user_id,
      order_date,
      total,
      shipping_address,
      billing_address,
      status,
      payment_method,
      shipping_method,
      product_id,
      quantity,
      price,
    } = order;

    const { rows } = await pool.query(
      `
            UPDATE orders
            SET
                user_id = $1,
                order_date = $2,
                total = $3,
                shipping_address = $4,
                billing_address = $5,
                status = $6,
                payment_method = $7,
                shipping_method = $8,
                product_id = $9,
                quantity = $10,
                price = $11
            WHERE
                order_id = $12
            RETURNING *;
            `,
      [
        user_id,
        order_date,
        total,
        shipping_address,
        billing_address,
        status,
        payment_method,
        shipping_method,
        JSON.stringify(product_id),
        quantity,
        price,
        orderId,
      ]
    );

    if (rows.length === 0) {
      throw new Error("Order not found");
    }

    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Delete an order
async function deleteOrder(orderId) {
  try {
    const { rows } = await pool.query(
      `DELETE FROM orders
            WHERE order_id= $1 
            RETURNING*; 
            `,
      [orderId]
    );
    if (rows.length === 0) {
      throw new Error("Order not found");
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
