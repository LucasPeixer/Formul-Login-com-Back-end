import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = 3000;

const pool = new Pool({
  user: "lucas",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add-user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const query = "INSERT INTO usuarios (username, password) VALUES ($1, $2)";
    const values = [username, password];

    await pool.query(query, values);
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
