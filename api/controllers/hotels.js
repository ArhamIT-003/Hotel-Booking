import Hotel from "../models/hotels.js";
import { createError } from "../utilies/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    console.log("Saving hotel:", newHotel);
    const savedHotel = await newHotel.save();
    console.log("Saved hotel:", savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted!");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log("Get Hotel: ", hotel);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotel = async (req, res, next) => {
  const isAuthenticated = true; // Check whether user is authenticated or not

  if (!isAuthenticated) {
    // Return an error if the user is not authenticated
    return next(createError(401, "You are not authenticated!"));
  }
  const { min, max, ...other } = req.query;

  try {
    const hotels = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels); // Return the rooms without "Get All Hotel" message
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  try {
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};
