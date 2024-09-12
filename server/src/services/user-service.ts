import User from "../models/user";

export async function insertUser(email: string, password: string) {
  const user = await User.create({ email, password });
  return user;
}

export async function findUser(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function getUser(id: string) {
  const res = await User.findById(id).select("-password");
  return res;
}
