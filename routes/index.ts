import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import courseRouter from "./course.routes";
import scoreRouter from "./score.routes";
import userRouter from "./user.routes";
import roomRouter from './room.routes';
import videoRouter from "./video.routes";
import dashboardRouter from './dashboard.routes'

const router = express.Router();

router.use("/user", userRouter);
router.use("/score", AuthMiddleware , scoreRouter);
router.use("/course", AuthMiddleware ,courseRouter)
router.use("/room", AuthMiddleware, roomRouter)
router.use("/video", AuthMiddleware, videoRouter)
router.use("/dashboard", AuthMiddleware, dashboardRouter)

export default router;