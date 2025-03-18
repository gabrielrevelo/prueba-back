import { Response } from "express";
import { ApiResponse } from "../types/response";

export class ResponseHandler {
  static success<T>(
    res: Response,
    statusCode: number,
    message?: string,
    data?: T,
    count?: number,
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      count,
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, statusCode: number = 500, error: string): void {
    const response: ApiResponse<null> = {
      success: false,
      error,
    };
    res.status(statusCode).json(response);
  }
}
