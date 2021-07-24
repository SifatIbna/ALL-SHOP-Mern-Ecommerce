import express from "express";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  apiLoginTest,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/login/test", apiLoginTest);

export default router;
