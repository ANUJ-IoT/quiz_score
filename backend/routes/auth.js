import express from "express";

const router = express.Router();

export default function authRoutes(db) {
  router.post("/register", (req, res) => {
    const { username, password } = req.body;
    db.query(
      "INSERT INTO user (username, password) VALUES (?,?) ",
      [username, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User Created" });
      },
    );
  });

  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
      "SELECT * FROM user WHERE username = ? AND password = ? ",
      [username, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0)
          return res.status(401).json({ error: "Invalid Credentials" });
        res.json({ message: "Login Succesfull", user: result[0] });
      },
    );
  });
  return router;
}
