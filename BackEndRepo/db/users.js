const pool = require("./index");

// Add a new user
async function createNewUser(newUserObj) {
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO users(username, password, is_admin)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [newUserObj.username, newUserObj.password, newUserObj.is_admin]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Add user details
async function addUserDetails(userId, userDetails) {
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO user_details(user_id, first_name, last_name, email, address, city, state, postal_code, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
      `,
      [
        userId,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.address,
        userDetails.city,
        userDetails.state,
        userDetails.postal_code,
        userDetails.country,
      ]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Fetch all users
async function fetchAllUsers() {
  try {
    const { rows } = await pool.query(
      `
      SELECT user_id, username, password, is_admin
      FROM users;
      `
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// Update a user
async function updateUser(userId, user) {
  try {
    const {
      username,
      password,
      is_admin,
      email,
      first_name,
      last_name,
      address,
      city,
      state,
      postal_code,
      country,
    } = user;
    const { rows } = await pool.query(
      `
      UPDATE users 
      SET username = $1, password = $2, is_admin = $3
      WHERE user_id = $4
      RETURNING *;
      `,
      [username, password, is_admin, userId]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }

    await pool.query(
      `
      UPDATE user_details
      SET email = $1, first_name = $2, last_name = $3, address = $4, city = $5, state = $6, postal_code = $7, country = $8
      WHERE user_id = $9;
      `,
      [
        email,
        first_name,
        last_name,
        address,
        city,
        state,
        postal_code,
        country,
        userId,
      ]
    );

    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Delete a user
async function deleteUser(userId) {
  try {
    await pool.query(`DELETE FROM user_details WHERE user_id = $1;`, [userId]);

    const { rows } = await pool.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *;`,
      [userId]
    );
    if (rows.length === 0) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}

// Fetch a user by username
async function fetchUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      `
      SELECT user_id, username, password, users.is_admin
      FROM users
      WHERE users.username = $1;
      `,
      [username]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Fetch a user by userid
async function fetchUserByUserId(userid) {
  try {
    const { rows } = await pool.query(
      `
      SELECT user_id, username, password, users.is_admin
      FROM users
      WHERE users.user_id = $1;
      `,
      [userid]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Fetch user details by userId
async function fetchUserDetailsByUserId(userId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM user_details
      WHERE user_id = $1;
      `,
      [userId]
    );
    if (rows.length === 0) {
      throw new Error("User details do not exist");
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchAllUsersAndDetails() {
  try {
    const { rows: users } = await pool.query(
      `
      SELECT u.user_id, u.username, u.is_admin,
        ud.first_name, ud.last_name, ud.email, ud.address, ud.city, ud.state, ud.postal_code, ud.country
      FROM users u
      LEFT JOIN user_details ud ON u.user_id = ud.user_id;
      `
    );

    return users;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNewUser,
  fetchAllUsers,
  updateUser,
  deleteUser,
  addUserDetails,
  fetchUserByUsername,
  fetchUserDetailsByUserId,
  fetchAllUsersAndDetails,
  fetchUserByUserId,
};
