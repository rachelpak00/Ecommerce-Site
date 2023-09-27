const pool = require("./index");

// Fetch all products
async function getAllProducts() {
  try {
    const { rows } = await pool.query("SELECT * FROM products;");
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// Fetch a product by ID
async function fetchProductById(productId) {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1;", [
      productId,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Add a new product
async function createProduct(newProduct) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, gender, category, price, quantity, brand, sku, image_url, weight, dimensions) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *;
      `,
      [
        newProduct.name,
        newProduct.description,
        newProduct.gender,
        newProduct.category,
        newProduct.price,
        newProduct.quantity,
        newProduct.brand,
        newProduct.sku,
        newProduct.image_url,
        newProduct.weight,
        newProduct.dimensions,
      ]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// Update a product
async function updateProduct(productId, product) {
  try {
    const validFields = [
      "name",
      "description",
      "gender",
      "category",
      "price",
      "quantity",
      "brand",
      "sku",
      "image_url",
      "weight",
      "dimensions",
    ];

    const updateFields = [];
    const updateValues = [];
    const updateParameters = [];
    let paramIndex = 1;

    Object.entries(product).forEach(([key, value]) => {
      if (validFields.includes(key)) {
        updateFields.push(key);
        updateValues.push(value);
        updateParameters.push(`$${paramIndex}`);
        paramIndex++;
      }
    });

    const query = `
      UPDATE products 
      SET ${updateFields.map((field, index) => `${field} = ${updateParameters[index]}`)}
      WHERE id = $${paramIndex}
      RETURNING *;
    `;

    const values = [...updateValues, productId];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("Product not found");
    }

    return rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Delete a product
async function deleteProduct(productId) {
  try {
    const { rows } = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *;`,
      [productId]
    );
    if (rows.length === 0) {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
};
