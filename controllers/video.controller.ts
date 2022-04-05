import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient()
export default class VideoController {
    static create: RequestHandler = async (req, res) => {
        const payload = req.body

        const result = await prisma.video.create({
            data: payload
        })
        res.send(success("Successfully add video", result))
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await prisma.video.findMany()
        res.send(success("Successfully get all video", result))
    }
}