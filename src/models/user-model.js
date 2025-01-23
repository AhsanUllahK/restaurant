import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, `User name is required.`],
    },
    email: {
      type: String,
      required: [true, `Email is required.`],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be of at least 6 characters"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
    },
    usertype: {
      type: String,
      required: [true, "User type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profilePic: {
      type: String,
      default: `https://thenounproject.com/icon/user-account-3201587/`,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
