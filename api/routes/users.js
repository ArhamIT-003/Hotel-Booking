import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../utilies/verifytoken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are authenticated!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are logged In and authenticated. You can delete your account!");
// });

// router.get("/check/:id", verifyAdmin, (req, res, next) => {
//   res.send(
//     "Hi Admin, You are logged In and authenticated. You can delete all account!"
//   );
// });

// Update
router.put("/:id", verifyUser, updateUser);
// Delete
router.delete("/:id", verifyUser, deleteUser);
// GET
router.get("/:id", verifyUser, getUser);
// GET -ALL
router.get("/", verifyAdmin, getAllUser);

export default router;
