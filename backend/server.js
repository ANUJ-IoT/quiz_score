import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import leaderBoardRoutes from "./routes/leaderBoardRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "quizapp",
});

db.connect((err) => {
  if (err) console.log("error:", err);
  else console.log("Connected");
});

app.use("/auth", authRoutes(db));
app.use("/leaderboard", leaderBoardRoutes(db));

app.listen(process.env.PORT, () => {
  console.log("the server is running on port ", process.env.PORT);
});
