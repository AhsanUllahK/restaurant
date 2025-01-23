import jwt from "jsonwebtoken";
import User from "./../models/user-model.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwtCookieS;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided." });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error protected route.", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default protectRoute;

// another way to get jwt cookies.
// try {
//     const token = req.headers["authorization"].split(" ")[1];
//     jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Un-Authorized User",
//         });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log("Error protected route.", {
//       message: error.message,
//       stack: error.stack,
//     });
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
