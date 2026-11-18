import express from "express";

export default function leaderBoardRoutes(pool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10",
      );
      return res.status(200).json({ message: rows });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });

  router.post("/", async (req, res) => {
    const { username, score, category } = req.body;
    try {
      await pool.execute(
        "INSERT INTO leaderboard (name, score, category) VALUES (?,?,?)",
        [username, score, category],
      );
      return res.status(201).json({ message: "Inserted Sucessfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  });

  return router;
}
