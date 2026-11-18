import express from "express";
import bcrypt from "bcrypt";

export default function authRoutes(pool) {
  const router = express.Router();
  router.post("/register", async (req, res) => {
    const { name, password } = req.body;
    try {
      const saltToPassword = 10;
      const hashedPassword = await bcrypt.hash(password, saltToPassword);
      const [result] = await pool.execute(
        "SELECT id FROM user WHERE name = ?",
        [name],
      );

      if (result.length !== 0)
        return res.status(400).json({ message: "Name Already Exists." });

      await pool.execute("INSERT INTO user (name, password) VALUES (?, ?)", [
        name,
        hashedPassword,
      ]);
      return res.status(201).json({ message: "Sucessfull." });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  });

  router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
      const [result] = await pool.execute(
        "SELECT id, password FROM user WHERE name = ? ",
        [name],
      );

      if (result.length === 0)
        return res.status(400).json({ message: "Name does not exists." });

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) return res.status(400).json({ message: "Unsuccessfull." });

      return res.status(200).json({ message: "Successfull." });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  });
  return router;
}
