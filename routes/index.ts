import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import courseRouter from "./course.routes";
import dashboardRouter from './dashboard.routes';
import lessonRouter from "./lesson.routes";
import roomRouter from './room.routes';
import scoreRouter from "./score.routes";
import { teacherRouter } from "./teacher.router";
import userRouter from "./user.routes";
import videoRouter from "./video.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/score", AuthMiddleware , scoreRouter);
router.use("/course", AuthMiddleware ,courseRouter)
router.use("/room", AuthMiddleware, roomRouter)
router.use("/video", AuthMiddleware, videoRouter)
router.use("/dashboard", AuthMiddleware, dashboardRouter)
router.use("/lesson", AuthMiddleware, lessonRouter)
router.use("/teacher", AuthMiddleware, teacherRouter)

export default router;