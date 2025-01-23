import bcrypt from "bcryptjs";
import User from "./../models/user-model.js";
import { generateToken } from "./../utils/token.js";

export const signup = async (req, res) => {
  const {
    email,
    password,
    phone,
    userName,
    profilePic,
    address,
    usertype,
    answer,
  } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least of 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already have an account." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // this creates and saves a new user in db ==> new User + user.save()
    const newUser = new User({
      userName,
      password: hashPassword,
      email,
      phone,
      profilePic,
      address,
      usertype,
      answer,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in signUp controller.js. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalide Credentials" });
    }

    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic,
      usertype: user.usertype,
    });
  } catch (error) {
    console.log("Error in SignIn Controller.js. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwtCookieS", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout Successfully." });
  } catch (error) {
    console.error("Error during sign-out:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
