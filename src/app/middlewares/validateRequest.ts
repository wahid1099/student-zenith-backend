import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import httpStatus from "http-status";

const validateRequest =
  (schema: ZodObject<ZodRawShape>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const flattened = err.flatten();
        res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          statusCode: httpStatus.BAD_REQUEST,
          message: "Validation failed",
          errors: flattened.fieldErrors, // object with path -> message array
        });
      } else {
        next(err); // Pass other errors to the error-handling middleware
      }
    }
  };

export default validateRequest;
