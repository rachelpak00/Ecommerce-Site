const { Pool } = require('pg');
require('dotenv').config();

console.log('Before creating pool');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log('After creating pool');


module.exports = pool;
