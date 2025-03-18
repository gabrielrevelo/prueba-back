import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send(`API running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
