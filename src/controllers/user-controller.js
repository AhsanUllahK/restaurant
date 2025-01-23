import User from "./../models/user-model.js";
import bcrypt from "bcryptjs";
export const getUserController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    user.password = undefined;
    res.status(200).send({ user, message: "User get Successfully." });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.body;
  //   const _id = req.body.id;
  try {
    // const updatedUser = await User.findByIdAndUpdate(
    //     userId, // Find user by ID
    //     { name, email, phone, address }, // Fields to update
    //     { new: true, runValidators: true } // Options to return the updated document and run validation
    //   );
    // first find the user by id and email.
    // const user = await User.findByIdAndUpdate({ _id });
    const user = await User.findOneAndUpdate({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // update
    const { userName, address, phone, usertype } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (usertype) user.usertype = usertype;

    await user.save();
    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;

  try {
    if (!newPassword || !oldPassword)
      return res
        .status(400)
        .json({ message: "Password fields need to be filled." });

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be of at least 6 characters." });
    }

    if (newPassword === oldPassword) {
      return res.status(400).json({
        message: "New Password must be different from previous ones.",
      });
    }

    const user = await User.findById({ _id: req.body.id });

    const isPasswordCorrect = bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Old Password." });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    await user.save();

    await updatedUser.save();
    res.status(200).json({ message: "User password Updated Successfully" });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAccount = async (req, res) => {};
