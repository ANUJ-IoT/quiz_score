import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.js";
import leaderBoardRoutes from "./routes/leaderBoardRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes(pool));
app.use("/leaderboard", leaderBoardRoutes(pool));

app.listen(process.env.PORT, () => {
  console.log("the server is running on port ", process.env.PORT);
});
