import express, { Router } from "express";
import { getUserProfile,followUnfollowUser,getSuggestedUsers,updateUser } from "../controllers/user.controller.js";
import { protectedRoute, } from "../middleware/protectedRoute.js";
const router=express.Router();

router.get("/profile/:username",protectedRoute,getUserProfile); //user  can posts of particular person
router.get("/suggested",protectedRoute,getSuggestedUsers); // this router gives an to follow the user that user are you are not following
router.post("/follow/:id",protectedRoute,followUnfollowUser); // user want to follow a person or another user
router.post("/update",protectedRoute,updateUser); // user want to update the particular fileld like bio  background img
export default router;