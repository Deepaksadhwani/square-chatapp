import User from "../models/user";

export async function getAllContacts(req: any, regex: any) {
  console.log("regex from console.log", regex);
  const contacts = await User.find({
    $and: [
      { _id: { $ne: req.userId } },
      { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
    ],
  });

  return contacts;
}
