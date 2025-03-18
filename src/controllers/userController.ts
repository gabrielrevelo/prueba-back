import { Request, Response } from "express";
import User from "../models/User";
import { ResponseHandler } from "../utils/responseHandler";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    ResponseHandler.success(res, 201, "User created successfully", user);
  } catch (error: any) {
    if (error.code === 11000) {
      ResponseHandler.error(res, 400, "Email already exists");
      return;
    }
    ResponseHandler.error(res, 400, error.message);
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    ResponseHandler.success(
      res,
      200,
      "Users retrieved successfully",
      users,
      users.length
    );
  } catch (error: any) {
    ResponseHandler.error(res, 400, error.message);
  }
};
