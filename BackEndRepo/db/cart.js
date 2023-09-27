const pool = require("./index");

// Fetch cart information by user ID
async function getCartByUserId(userId) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM cart WHERE user_id = $1;`,
      [userId]
    );
    if (rows.length === 0) {
      return "User cart is empty";
    } else return rows;
  } catch (error) {
    console.log(error);
  }
}

// Add a product to the cart
async function addToCart(userId, productId, quantity) {
  console.log(
    `userId: ${userId}, productId: ${productId}, quantity: ${quantity}`
  ); 

  try {
    const { rows } = await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity) 
       VALUES ($1, $2, $3) 
       RETURNING *;
      `,
      [userId, productId, quantity]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    if (error.code === "23503"){
      return "UserId does not exist"
    } else if (error.code === "23505"){
      return "UserId and ProductId already exists in cart"
    }
  }
}

// Remove a product from the cart
async function removeFromCart(userId, productId) {
  try {
    const { rows } = await pool.query(
      `DELETE FROM cart 
       WHERE user_id = $1 AND product_id = $2 
       RETURNING *;
      `,
      [userId, productId]
    );
    if (rows.length === 0) {
      throw new Error("Product not found in the cart");
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Edit the cart (update the quantity of an item)
async function editCart(userId, productId, newQuantity) {
  try {
    const { rows } = await pool.query(
      `UPDATE cart 
       SET quantity = $1 
       WHERE user_id = $2 AND product_id = $3 
       RETURNING *;
      `,
      [newQuantity, userId, productId]
    );
    if (rows.length === 0) {
      throw new Error("Product not found in the cart");
    }
    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  editCart,
};
