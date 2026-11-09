import express from "express";

const router = express.Router();

export default function leaderBoardRoutes(db) {
  router.get("/", (req, res) => {
    db.query(
      "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10",
      (err, result) => {
        if (err) return res.status(401).json({ err: err.message });
        res.json(result);
      },
    );
  });

  router.post("/", (req, res) => {
    const { username, score, category } = req.body;
    db.query(
      "INSERT INTO leaderboard (username , score, category ) VALUES (?,?,?)",
      [username, score, category],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId });
      },
    );
  });

  return router;
}
