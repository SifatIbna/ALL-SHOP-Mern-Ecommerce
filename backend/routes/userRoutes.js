import express from "express";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  apiLoginTest,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/login/test", apiLoginTest);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
