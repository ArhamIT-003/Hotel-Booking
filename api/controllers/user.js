import User from "../models/user.js";
import { createError } from "../utilies/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("Get User: ", user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  const failed = true;

  if (failed) {
    return next(createError(401, "You are not authenticated!"));
  }
  try {
    const user = await User.find();
    res.status(200).json("Get All User", user);
  } catch (error) {
    next(error);
  }
};
