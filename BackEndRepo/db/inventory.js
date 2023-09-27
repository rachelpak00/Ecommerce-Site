const pool = require("./index");

// Add new inventory entry
async function createInventory(newInventory) {
    try {
        const { rows } = await pool.query(`
            INSERT INTO inventory (product_id, quantity, cost)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [
            newInventory.product_id, 
            newInventory.quantity,
            newInventory.cost, 
        ]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

// Get all inventory
async function getAllInventory() {
    try {
        const { rows } = await pool.query("SELECT * FROM inventory;");
        return rows;
    } catch (error) {
        console.log(error);
    }
}

// Get details of inventory for a specific product
async function getSpecficInventory(inventoryId) {
    try {
        const { rows } = await pool.query(`
        SELECT * FROM products
        WHERE id = $1;`,
        [
            inventoryId,
        ]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

// Update the details of inventory for a specific product
async function updateInventory(inventoryId, inventory) {
    try {
        const validFields = [
            "product_id",
            "quantity",
            "cost",
        ];

        const updateFields = [];
        const updateValues = [];
        const updateParameters = [];
        let paramIndex = 1;

        Object.entries(inventory).forEach(([key, value]) => {
            if (validFields.includes(key)) {
                updateFields.push(key);
                updateValues.push(value);
                updateParameters.push(`$${paramIndex}`);
            }
        });

        const query = `
            UPDATE inventory
            SET ${updateFields.map((field, index) => `${field} = ${updateParameters[index]}`)}
            WHERE id = $${paramIndex}
            RETURNING *;
        `;

        const values = [...updateValues, inventoryId];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            throw new Error("Inventory of product not found");
        }
        return rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
}

// Delete inventory for a specific product
async function deleteInventory(inventoryId) {
    try {
        const { rows } = await pool.query(`
            DELETE FROM inventory
            WHERE id = $1
            RETURNING *;
        `, [inventoryId]);
        if (rows.length === 0) {
            throw new Error("Inventory of product not found");
        }
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
}

module.exports = {
    getAllInventory,
    getSpecficInventory,
    updateInventory,
    deleteInventory,
    createInventory,
}