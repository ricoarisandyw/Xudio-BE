import express from "express";
import courseRouter from "./course.routes";
import scoreRouter from "./score.routes";
import userRouter from "./user.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/score", scoreRouter);
router.use("/course", courseRouter)

export default router;