const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect(function (err, client, done) {
  if (err) {
    AppError("Database connection failed", 500);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = pool;
