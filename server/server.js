const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let pool;

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS cryptoleap_db`);
  await connection.query(`USE cryptoleap_db`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      surname VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Database & table ready");

  await connection.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "cryptoleap_db",
  });
}

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)",
      [name, surname, email, hashedPassword]
    );

    const token = jwt.sign(
      {
        id: result.insertId,
        email,
        name,
        surname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: result.insertId,
        name,
        surname,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    const [users] = await pool.query(
      "SELECT id, name, surname, email, password FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, surname, email, created_at FROM users WHERE id = ?",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: users[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/rates", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=RUB&to=USD,EUR"
    );

    if (!response.ok) {
      return res.status(502).json({ message: "Failed to load rates" });
    }

    const data = await response.json();

    return res.json({
      base: data.base,
      date: data.date,
      rates: {
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        RUB: 1,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Rates server error" });
  }
});

app.get("/api/account-data", authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, surname, email, created_at FROM users WHERE id = ?",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let rates = {
      base: "USD",
      date: null,
      USD: 1,
      EUR: null,
      RUB: null,
    };

    try {
      const response = await fetch(
        "https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,RUB"
      );

      if (response.ok) {
        const data = await response.json();

        rates = {
          base: data.base,
          date: data.date,
          USD: 1,
          EUR: data.rates?.EUR ?? null,
          RUB: data.rates?.RUB ?? null,
        };
      }
    } catch (ratesError) {
      console.error("Rates load error:", ratesError.message);
    }

    return res.json({
      user: users[0],
      rates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();