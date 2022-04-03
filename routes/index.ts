import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import courseRouter from "./course.routes";
import scoreRouter from "./score.routes";
import userRouter from "./user.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/score", AuthMiddleware , scoreRouter);
router.use("/course", AuthMiddleware ,courseRouter)

export default router;