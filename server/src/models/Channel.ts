import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  ],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

channelSchema.pre("save", function (this: any, next) {
  this.updatedAt = Date.now();
  next();
});

channelSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
