import User from "./../models/user-model.js";
const admin_middleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user.usertype !== "admin") {
      return res.status(401).json({ message: "Only admin Access." });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Un-Authorized Accessed ", error });
  }
};

export default admin_middleware;
