import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  searchUsersByCity
} from "../controllers/userController";
import { validateUserCreation, validateUserUpdate, validateUserId, validateCitySearch } from '../middleware/userValidation';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post("/", validateUserCreation, validateRequest, async (req: Request, res: Response) => {
  await createUser(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await getUsers(req, res);
});

router.get("/search", validateCitySearch, validateRequest, async (req: Request, res: Response) => {
  await searchUsersByCity(req, res);
});

router.get("/:id", validateUserId, validateRequest, async (req: Request, res: Response) => {
  await getUserById(req, res);
});

router.put("/:id", validateUserUpdate, validateRequest, async (req: Request, res: Response) => {
  await updateUser(req, res);
});

router.delete("/:id", validateUserId, validateRequest, async (req: Request, res: Response) => {
  await deleteUser(req, res);
});

export default router;
