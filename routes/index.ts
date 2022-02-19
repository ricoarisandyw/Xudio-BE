import express from "express";
import courseRouter from "./course";
import scoreRouter from "./score";
import userRouter from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use("/score", scoreRouter);
router.use("/course", courseRouter)

export default router;