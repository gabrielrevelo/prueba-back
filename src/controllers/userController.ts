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
    const users = await User.find({ deleted_at: null });
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

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      deleted_at: null,
    });

    if (!user) {
      ResponseHandler.error(res, 404, "User not found");
      return;
    }

    ResponseHandler.success(res, 200, "User retrieved successfully", user);
  } catch (error: any) {
    if (error.name === "CastError") {
      ResponseHandler.error(res, 400, "Invalid user ID format");
      return;
    }
    ResponseHandler.error(res, 400, error.message);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        deleted_at: null,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      ResponseHandler.error(res, 404, "User not found");
      return;
    }

    ResponseHandler.success(res, 200, "User updated successfully", user);
  } catch (error: any) {
    if (error.code === 11000) {
      ResponseHandler.error(res, 400, "Email already exists");
      return;
    }
    if (error.name === "CastError") {
      ResponseHandler.error(res, 400, "Invalid user ID format");
      return;
    }
    ResponseHandler.error(res, 400, error.message);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        deleted_at: null,
      },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!user) {
      ResponseHandler.error(res, 404, "User not found");
      return;
    }

    ResponseHandler.success(res, 200, "User deleted successfully");
  } catch (error: any) {
    if (error.name === "CastError") {
      ResponseHandler.error(res, 400, "Invalid user ID format");
      return;
    }
    ResponseHandler.error(res, 400, error.message);
  }
};
