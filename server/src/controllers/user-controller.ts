import { Request,  Response } from "express";
import {
  deleteUserImage,
  findUser,
  getUser,
  insertUser,
  updateUserImage,
  updateUserProfile,
} from "../services/user-service";
import {
  authValidationSchema,
  updateProfileSchema,
} from "../utils/zod-schemas";
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from "../utils/securityHelpers";
import { renameSync, unlinkSync } from "fs";
import User from "../models/user";

const maxAge = 3 * 24 * 60 * 60 * 1000;

// signup Controller
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
      id: user._id,
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

// login controller
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
      return res.status(400).json({ Message: "User does not exist." });
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
          id: user._id,
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

//get the user information for persistent login after refresh
export const getUserInfoController = async (req: any, res: Response) => {
  try {
    const userData = await getUser(req.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ message: "User with the given id not found." });
    }

    return res.status(200).json({
      message: "user information is successfully fetched",
      data: userData,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// update user profile
export const updateProfileController = async (req: any, res: Response) => {
  console.log(req.body);
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "FirstName LastName and color is required." });
  }
  const { firstName, lastName, color } = parsed.data;
  try {
    const updatedUserData = await updateUserProfile(req.userId, {
      firstName,
      lastName,
      color,
      profileSetup: true,
    });

    res.status(200).json({
      message: "user profile has been successfully updated",
      data: updatedUserData,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// updateAddImageController
export const addImageController = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required." });
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);
    console.log(fileName);
    const updatedUser = await updateUserImage(req.userId, fileName);
    res.status(200).json({
      image: updatedUser,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

//delete image  Controller
export const removeImageController = async (req: any, res: Response) => {
  console.log(req.body);
  try {
    const user = await deleteUserImage(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.image) {
      console.log("hit")
      unlinkSync(user.image);
    }

    res.status(200).json({ message: "Profile image removed Successfully." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
