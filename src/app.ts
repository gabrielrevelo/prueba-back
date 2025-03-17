import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send(`API running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
