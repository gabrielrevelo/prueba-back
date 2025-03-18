import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { ResponseHandler } from "../utils/responseHandler";
import { IUserQuery } from "../types/user";

export class UserController {
  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      ResponseHandler.success(res, 201, "User created successfully", user);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query: IUserQuery = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      };

      const { users, pagination } = await UserService.findAll(query);
      ResponseHandler.success(
        res,
        200,
        "Users retrieved successfully",
        users,
        pagination
      );
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) {
        ResponseHandler.error(res, 404, "User not found");
        return;
      }
      ResponseHandler.success(res, 200, "User retrieved successfully", user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserService.update(req.params.id, req.body);
      if (!user) {
        ResponseHandler.error(res, 404, "User not found");
        return;
      }
      ResponseHandler.success(res, 200, "User updated successfully", user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserService.delete(req.params.id);
      if (!user) {
        ResponseHandler.error(res, 404, "User not found");
        return;
      }
      ResponseHandler.success(res, 200, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async searchUsersByCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query: IUserQuery = {
        city: req.query.city as string,
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      };

      if (!query.city) {
        ResponseHandler.error(res, 400, "The 'city' parameter is required");
        return;
      }

      const { users, pagination } = await UserService.findByCity(query);
      ResponseHandler.success(
        res,
        200,
        `Users found in the city: ${query.city}`,
        users,
        pagination
      );
    } catch (error) {
      next(error);
    }
  }
}
