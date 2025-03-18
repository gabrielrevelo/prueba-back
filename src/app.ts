import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send(`API running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
