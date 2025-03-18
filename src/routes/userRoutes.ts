import express from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

router.post('/', async (req, res) => {
  await createUser(req, res);
});

export default router;