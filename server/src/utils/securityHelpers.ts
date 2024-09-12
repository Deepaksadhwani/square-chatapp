import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

/*---------------------------bcrypt---------------------- */
export const hashPassword = async (
  password: string,
  saltRound: number
): Promise<string> => {
  return await bcrypt.hash(password, saltRound);
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
};

/*---------------------------JWT------------------------ */

export const secretKey: string = process.env.JWT_KEY || "";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, secretKey);
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
