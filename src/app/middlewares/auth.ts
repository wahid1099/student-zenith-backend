import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { UserRole } from "../modules/user/user.interface";

const Auth = (...requiredRole: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized !!");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : undefined;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Token missing or malformed");
    }

    jwt.verify(token, config.jwt.jwt_secret as string, function (err, decoded) {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized!!");
      }

      const user = decoded as JwtPayload;

      if (requiredRole && !requiredRole.includes(user.role)) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You have no access to this route!!",
        });
      }

      (req as any).user = user;
      next();
    });
  });
};

export default Auth;
