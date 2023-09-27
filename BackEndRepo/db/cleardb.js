const pool = require("./index");

async function deleteEverything() {
  try {
    await pool.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

    console.log("Everything deleted successfully!");
  } catch (error) {
    console.log(error);
  } finally {
    pool.end();
  }
}

deleteEverything();
