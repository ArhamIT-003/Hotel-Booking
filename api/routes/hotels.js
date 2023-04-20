import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utilies/verifytoken.js";

const router = express.Router();

// Create

router.post("/", verifyAdmin, createHotel);
// Update
router.put("/:id", verifyAdmin, updateHotel);
// Delete
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/find/:id", getHotel);
// GET -ALL
router.get("/", getAllHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

export default router;
