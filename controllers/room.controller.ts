import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient();

export default class RoomController {
    static create: RequestHandler = async (req, res) => {
        const payload = req.body

        console.log("Payload", payload)
        const result = await prisma.room.create({
            data: {
                created_at: new Date().toISOString(),
                ...payload,
            }
        })
        res.send(success("Successfully create room", result))
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await prisma.room.findMany();
        res.send(success("Successfully get all room", result))
    }
}