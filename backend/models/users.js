import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      default: "",
      trim: true,
    },
    userBio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
usersSchema.index({ firstName: 1 }, { unique: true });
const User = mongoose.model("User", usersSchema);

export default User;
