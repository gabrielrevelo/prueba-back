import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  searchUsersByCity
} from "../controllers/userController";

const router = express.Router();

router.post("/", async (req, res) => {
  await createUser(req, res);
});

router.get("/", async (req, res) => {
  await getUsers(req, res);
});

router.get("/search", async (req, res) => {
  await searchUsersByCity(req, res);
});

router.get("/:id", async (req, res) => {
  await getUserById(req, res);
});

router.put("/:id", async (req, res) => {
  await updateUser(req, res);
});

router.delete("/:id", async (req, res) => {
  await deleteUser(req, res);
});

export default router;
