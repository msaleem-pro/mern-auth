const userModel = require("../models/user_model");
const genError = require("../utils/error");

const updateUser = async (req, res, next) => {
  const updates = req.body;
  const id = req.params.id;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      status: "OK",
      msg: "User has been added.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { updateUser };
