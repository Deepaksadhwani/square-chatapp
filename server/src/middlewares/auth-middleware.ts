import { NextFunction, Response } from "express";
import { verifyJwtToken } from "../utils/securityHelpers";
import { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated!" });
  const { id } = verifyJwtToken(token) as JwtPayload;
  if (!id) {
    return res
      .status(404)
      .json({ message: "invalid authentication token found." });
  }
  req.userId = id;
  next();
};
