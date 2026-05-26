const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect(function (err, client, done) {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to PostgreSQL successfully!");
    done();
  }
});

module.exports = pool;
