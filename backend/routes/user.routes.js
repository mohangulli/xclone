import express, { Router } from "express";
import { getUserProfile,followUnfollowUser,getSuggestedUsers,updateUser } from "../controllers/user.controller.js";
import { protectedRoute, } from "../middleware/protectedRoute.js";
const router=express.Router();

router.get("/profile/:username",protectedRoute,getUserProfile);
router.get("/suggested",protectedRoute,getSuggestedUsers);
router.post("/follow/:id",protectedRoute,followUnfollowUser);
router.post("/update",protectedRoute,updateUser);
export default router;