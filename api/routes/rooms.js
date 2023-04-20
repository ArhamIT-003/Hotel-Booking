import express from "express";
import { verifyAdmin } from "../utilies/verifytoken.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
} from "../controllers/rooms.js";
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
// Update
router.put("/:id", verifyAdmin, updateRoom);
// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// GET
router.get("/:id", getRoom);
// GET -ALL
router.get("/", getAllRoom);
export default router;
