import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.PRIVATE_KEY, {
    expiresIn: "3d",
  });

  res.cookie("jwtCookieS", token, {
    maxAge: 3 * 24 * 69 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "developement",
  });

  return token;
};

export default generateToken;
