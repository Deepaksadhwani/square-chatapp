import Message from "../models/message";
import User from "../models/user";

export async function getFilterContacts(req: any, regex: any) {
  const contacts = await User.find({
    $and: [
      { _id: { $ne: req.userId } },
      { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
    ],
  });

  return contacts;
}

export async function getUserContactWithOrder(userId: string) {
  const contacts = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $sort: { timestamp: -1 },
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ["$sender", userId] },
            then: "$recipient",
            else: "$sender",
          },
        },
        lastMessageTime: { $first: "$timestamp" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "contactInfo",
      },
    },
    {
      $unwind: "$contactInfo",
    },
    {
      $project: {
        _id: 1,
        lastMessageTime: 1,
        email: "$contactInfo.email",
        firstName: "$contactInfo.firstName",
        lastName: "$contactInfo.lastName",
        image: "$contactInfo.image",
        color: "$contactInfo.color",
      },
    },
    {
      $sort: {
        lastMessageTime: -1,
      },
    },
  ]);
  return contacts;
}
