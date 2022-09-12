import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { parse } from "path";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient();

export default class RoomController {
    static getDetail: RequestHandler = async (req, res) => {
        const { id } = req.params

        
        const room = await prisma.room.findFirst({
            where: {
                id: +id
            }
        })

        const userInRoom = await prisma.user_in_room.findMany({
            where: {
                idRoom: +id
            }
        })

        const users = await prisma.user_detail.findMany({
            where : {
                idUser: {
                    in: userInRoom.map((v) => v.idUser || 0)
                }
            }
        })
        console.log({ users })

        // parse
        // {"id", "name", "capacity", "filled", "createdAt", "updatedAt","image", "member(user in room)", "member image", "member id", "admin room": {"name", "nip"}}
        const parse = {
            id: room?.id,
            capacity: room?.capacity,
            filled: room?.filled,
            createdAt: room?.createdAt,
            updateAt: new Date(),
            image: room?.image,
            members: userInRoom.map((u) => {
                const usr = users.find((us) => us.idUser === u.idUser)

                return {
                    id: u.id,
                    name: usr?.name,
                    email: usr?.email,
                    image: usr?.image
                }
            }),
            adminRoom: room?.adminRoom
        }

        res.send(success("Successfully get detail room", parse))
    }

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
                idRoom: +idRoom
            }
        })

        const rooms = await prisma.room.findMany({
            where: {
                id: {
                    in: result.map((r) => r.idRoom || 0)
                }
            }
        })

        // {"id", "name", "capacity", "filled", "createdAt", "updatedAt","image"}
        // parse
        const allRooms = rooms.map((r) => ({
            id: r.id,
            name: r.name,
            capacity: r.capacity,
            filled: r.filled,
            image: "",
            createdAt: r.createdAt,
            updateAt: new Date()
        }))

        res.send(success("Successfully get all user in room", allRooms))
    }

    static create: RequestHandler = async (req, res) => {
        const payload = req.body

        const result = await prisma.room.create({
            data: {
                createdAt: new Date().toISOString(),
                name: payload.name,
                capacity: +payload.capacity,
                filled: +payload.filled,
                adminRoom: +payload.adminRoom,
                image: payload.image,
                status: payload.status
            }
        })
        res.send(success("Successfully create room", result))
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await prisma.room.findMany();
        
        res.send(success("Successfully get all room", result))
    }
}