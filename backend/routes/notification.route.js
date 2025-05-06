import express  from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getNotifications } from "../controllers/notification.controller.js";
import { deleteNotifications, } from "../controllers/notification.controller.js";
// import {deleteNotification} from"../controllers/notification.controller.js";
const router =express.Router();
router.get("/",protectedRoute,getNotifications);
router.delete("/",protectedRoute,deleteNotifications);
// router.delete("/:id",protectedRoute,deleteNotification);


export default router;