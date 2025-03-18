import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import { DocsController } from './controllers/docsController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', DocsController.getDocumentation);
app.use('/users', userRoutes);

app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
