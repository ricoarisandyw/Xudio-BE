import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient();

export default class RoomController {
    static join: RequestHandler = async (req, res) => {
        const payload = req.body

        const result = await prisma.user_in_room.create({
            data: payload
        })
        res.send(success("Successfully join room", result))
    }

    static getAllUser: RequestHandler = async (req, res) => {
        const { idRoom } = req.params

        const result = await prisma.user_in_room.findMany({
            where: {
                id_room: +idRoom
            }
        })

        res.send(success("Successfully get all user in room", result.map((value) => value.id_user)))
    }

    static create: RequestHandler = async (req, res) => {
        const payload = req.body

        console.log("Payload", payload)
        const result = await prisma.room.create({
            data: {
                created_at: new Date().toISOString(),
                name: payload.name,
                capacity: +payload.capacity,
                filled: +payload.filled,
            }
        })
        res.send(success("Successfully create room", result))
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await prisma.room.findMany();
        res.send(success("Successfully get all room", result))
    }
}