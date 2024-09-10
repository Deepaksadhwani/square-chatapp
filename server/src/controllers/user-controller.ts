import { Request, Response } from "express";
import { findUser, insertUser } from "../services/user-service";
import { authValidationSchema } from "../utils/zod-schemas";
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from "../utils/securityHelpers";

const maxAge = 3 * 24 * 60 * 60 * 1000;

export const signupController = async (req: Request, res: Response) => {
  const parsed = authValidationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ Message: "Invalid input found", data: parsed.error });
  }
  const { email, password } = parsed.data;
  const user = await findUser(email);
  if (user) {
    return res.status(400).json({ Message: "User already exists." });
  }
  try {
    const encryptedPassword = await hashPassword(password, 10);
    const user: any = await insertUser(email, encryptedPassword);
    console.log(user);
    const token = generateToken(user._id);
    res.cookie("token", token, {
      maxAge,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(201).json({
      message: "User account has been successfully created.",
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      profileSetup: user.profileSetup,
      email: user.email,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const parsed = authValidationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ Message: "Invalid input found", data: parsed.error });
  }
  const { email, password } = parsed.data;
  const user: any = await findUser(email);
  try {
    if (!user) {
      return res.status(400).json({ Message: "User does not already exist." });
    } else {
      const isPasswordMatched = await verifyPassword(password, user.password);
      if (isPasswordMatched) {
        const token = generateToken(user._id);
        res.cookie("token", token, {
          maxAge,
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        res.status(201).json({
          message: "User account has been successfully logged in.",
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          profileSetup: user.profileSetup,
          email: user.email,
        });
      } else {
        res.status(404).json({ Message: "Invalid password entered." });
      }
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error." });
  }
};
