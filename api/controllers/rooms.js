import Hotel from "../models/hotels.js";
import Room from "../models/rooms.js";
import { createError } from "../utilies/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room deleted!");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      // Return an error if the room with the given id does not exist
      return next(createError(404, "Room not found"));
    }
    console.log("Get Room: ", room);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRoom = async (req, res, next) => {
  const isAuthenticated = true; // Check whether user is authenticated or not

  if (!isAuthenticated) {
    // Return an error if the user is not authenticated
    return next(createError(401, "You are not authenticated!"));
  }

  try {
    const rooms = await Room.find();
    res.status(200).json(rooms); // Return the rooms without "Get All Hotel" message
  } catch (error) {
    next(error);
  }
};
