import  express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createPost,deletePost,commentOnPost,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPosts,getUserPosts } from "../controllers/post.controller.js";
const router=express.Router();
router.get("/all",protectedRoute,getAllPosts); // show the post that posted by the user
router.get("/following",protectedRoute,getFollowingPosts); // posts of particular person that person following by login user
router.get("/likes/:id",protectedRoute,getLikedPosts); //  loginuser want to know  what post liked show all liked posts 
router.get("/user/:username",protectedRoute,getUserPosts); //  show the all posts of particular user by username

router.post("/create",protectedRoute,createPost); // user want to create anew post
router.post("/comment/:id",protectedRoute,commentOnPost); // user want comment a particular post
router.post("/like/:id",protectedRoute,likeUnlikePost); // user want to follow or un follow the particular user
router.delete("/:id",protectedRoute,deletePost); // user want to delete the post 
export default router;
