import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", async (req, res) => {
  await createUser(req, res);
});

router.get("/", async (req, res) => {
  await getUsers(req, res);
});

router.get("/:id", async (req, res) => {
  await getUserById(req, res);
});

router.put("/:id", async (req, res) => {
  await updateUser(req, res);
});

export default router;
