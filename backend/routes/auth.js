import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

export default function authRoutes(db) {
  router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      const saltToPassword = 10;
      const hashedPassword = await bcrypt.hash(password, saltToPassword);
      db.query(
        "INSERT INTO user (username, password) VALUES (?,?) ",
        [username, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          return res.status(200).json({ message: "User Created" });
        },
      );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

  router.post("/login", (req, res) => {
    try {
      const { username, password } = req.body;
      db.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
        async (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          if (result.length === 0)
            return res.status(401).json({ error: "Invalid Credentials" });
          const isMatch = await bcrypt.compare(password, result[0].password);
          if (!isMatch)
            return res
              .status(400)
              .json({ message: "Invalid Credentials. Hash" });
          res.json({ message: "Login Succesfull", user: result[0] });
        },
      );
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
  return router;
}
