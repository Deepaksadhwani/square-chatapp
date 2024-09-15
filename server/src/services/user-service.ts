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

export async function updateUserProfile(
  id: string,
  data: {
    firstName: string;
    lastName: string;
    color: number;
    profileSetup: boolean;
  }
) {
  const res = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");
  return res;
}

export async function updateUserImage(id: string, image: string) {
  const res = await User.findByIdAndUpdate(
    id,
    { image },
    { new: true, runValidators: true }
  ).select("image");
  return res;
}

export async function deleteUserImage(id: string) {
  const user = await User.findByIdAndUpdate(id, { $set: { image: null } });
  return user;
}


