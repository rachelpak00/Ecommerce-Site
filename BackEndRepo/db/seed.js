const pool = require("./index");
const { fetchAllUsers } = require("./users");
const { getAllProducts } = require("./products");
const { getAllOrders } = require("./orders");

async function createTables() {
  try {
    const tablesToCreate = getTablesToCreate();

    for (const table of tablesToCreate) {
      await pool.query(table.query);
    }
  } catch (error) {
    console.log(error);
  }
}

function getTablesToCreate() {
  const tables = [
    {
      name: "users",
      query: `
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false
      );
      `,
    },
    {
      name: "user_details",
      query: `
      CREATE TABLE IF NOT EXISTS user_details (
        user_id INTEGER PRIMARY KEY REFERENCES users (user_id),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        address VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        postal_code VARCHAR(255),
        country VARCHAR(255)
      );
      `,
    },
    {
      name: "products",
      query: `
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          gender VARCHAR(255),
          category VARCHAR(255),
          price NUMERIC(10, 2) NOT NULL,
          quantity INTEGER,
          brand VARCHAR(255),
          sku VARCHAR(255),
          image_url VARCHAR(255),
          weight NUMERIC(10, 2),
          dimensions JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
    {
      name: "promotions",
      query: `
        CREATE TABLE IF NOT EXISTS promotions (
          promotion_id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          discount DECIMAL(5, 2) NOT NULL,
          active BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
    {
      name: "cart",
      query: `
      CREATE TABLE IF NOT EXISTS cart (
        user_id INTEGER REFERENCES users(user_id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_product_cart UNIQUE (user_id, product_id)
      );
      `,
    },
    {
      name: "payment_details",
      query: `
        CREATE TABLE IF NOT EXISTS payment_details (
          payment_id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(user_id),
          cardholder_name VARCHAR(255), 
          card_number BIGINT, 
          expiration_date DATE,
          cvv INTEGER NOT NULL CHECK (CVV BETWEEN 0 and 9999),
          billing_address VARCHAR(255),
          default_payment BOOLEAN
        );
      `,
    },
    {
      name: "orders",
      query: `
      CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id), 
        order_date DATE,
        total FLOAT,
        shipping_address VARCHAR(255),
        billing_address VARCHAR(255),
        status VARCHAR (255),
        payment_method INTEGER REFERENCES payment_details(payment_id),
        shipping_method VARCHAR(255),
        product_id JSONB,
        quantity INT,
        price FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
    {
      name: "order_history",
      query: `
        CREATE TABLE IF NOT EXISTS order_history (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(user_id),
          order_date DATE,
          payment_id INTEGER REFERENCES payment_details(payment_id), 
          shipping_address VARCHAR(255),
          total FLOAT,
          order_status VARCHAR(255)
        );
        `,
    },
    {
      name: "admin_dashboard",
      query: `
        CREATE TABLE IF NOT EXISTS admin_dashboard (
          id SERIAL PRIMARY KEY
       );
       `,
    },
    {
      name: "inventory",
      query: `
        CREATE TABLE IF NOT EXISTS inventory (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          quantity INTEGER,
          cost FLOAT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `,
    },
  ];

  return tables;
}

async function buildDatabase() {
  try {
    await createTables();

    console.log("Tables created successfully!");

    const allUsers = await fetchAllUsers();
    console.log("All users:", allUsers);

    const allProducts = await getAllProducts();
    console.log("All products:", allProducts);

    const allOrders = await getAllOrders();
    console.log("All orders:", allOrders);
  } catch (error) {
    console.log(error);
  } finally {
    pool.end();
  }
}

buildDatabase();
