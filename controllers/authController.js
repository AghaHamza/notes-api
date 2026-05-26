const bcrypt = require("bcrypt");
const pool = require("../db");
const AppError = require("../middlewares/AppError");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );

    res
      .status(201)
      .json({ message: "User registered successully", user: newUser.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      throw new AppError("Invalid credentials", 401);
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
