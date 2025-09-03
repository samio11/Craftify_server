import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const checkAuth =
  (requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization || req?.cookies?.accessToken;
      if (!token) {
        throw new AppError(404, "Token is not Found");
      }
      const verifiedToken = verifyToken(
        token,
        config.JWT_ACCESS_TOKEN as string
      ) as JwtPayload;
      const existUser = await User.findOne({ email: verifiedToken?.email });
      if (!existUser) {
        throw new AppError(404, "User is not Found");
      }
      if (existUser.isVerified === false) {
        throw new AppError(401, "This is Not verified User");
      }
      if (!requiredRole.includes(existUser.role)) {
        throw new AppError(401, "Access Denied");
      }
      req.user = verifiedToken;
      next();
    } catch (err) {
      next(err);
    }
  };
