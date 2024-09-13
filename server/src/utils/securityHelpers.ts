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

export const extractPublicId = (url: string): string => {
  // Cloudinary public ID is typically found after the folder name in the URL
  // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/profiles/abc123.jpg
  // We need to remove the base URL and file extension to get the public ID.
  const parts = url.split("/");
  const publicIdWithExt = parts.slice(-2).join("/"); // Get the last two parts of the URL which include the folder and public ID
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // Remove file extension (e.g., .jpg)
  return publicId;
};
