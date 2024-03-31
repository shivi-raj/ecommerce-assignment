import { NextFunction, Request, Response } from "express";
import { ObjectType } from "../types/types";

const serializeError = (error: Error): Record<string, any> => {
  return {
      name: error.name,
      message: error.message,
      stack: error.stack
  };
}
// Middleware function to handle success responses
export const handleSuccess = (req: Request, res: ObjectType, next: NextFunction) => {
  res.success = (data: any, code = 200, message = "Success") => {
    res.status(200).json({
      success: true,
      code,
      message,
      data // Send data along with the response
    });
  };
  next();
};

// Middleware function to handle error responses
export const handleError = (req: Request, res: ObjectType, next: NextFunction) => {
  res.error = (error: any, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      code: statusCode,
      error: serializeError(error),
    });
  };
  next();
};


