import { RequestHandler } from "express";
import { In } from "typeorm";
import IRoom from "../src/entity/IRoom";
import ITeacher from "../src/entity/ITeacher";
import ITeacherInRoom from "../src/entity/ITeacherInRoom";
import IUserDetail from "../src/entity/IUserDetail";
import { IUserInRoom } from "../src/entity/IUserInRoom";
import { failed, success } from "../utils/response-builder";

export default class RoomController {
    static deleteRoom: RequestHandler = async (req, res) => {
        const { idRoom } = req.params

        await IRoom.createQueryBuilder().where("id = :id", { id : idRoom }).delete().execute()

        res.send(success("Successfully delete room"))
    }

    static getDetail: RequestHandler = async (req, res) => {
        const { id } = req.params

        
        const room = await IRoom.findOneBy({
                id: +id
            })

        // Get Users
        const userInRoom = await IUserInRoom.findBy({
            idRoom: +id
        })

        const users = await IUserDetail.find({
            where : {
                idUser: In(userInRoom.map((v) => v.idUser || 0))
            }
        })

        // Get Teacher
        const teacherInRoom = await ITeacherInRoom.findOneBy({
            idRoom: +id
        })

        const teacher = await ITeacher.findOneBy({
            id: teacherInRoom?.id
        })

        // parse
        const parse = {
            id: room?.id,
            capacity: room?.capacity,
            filled: room?.filled,
            createdAt: room?.createdAt,
            updatedAt: new Date(),
            image: room?.image,
            teacher: teacher,
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

        const existing = await IUserInRoom.findOneBy({
            idRoom: payload.idRoom,
            idUser: payload.idUser
        })

        if(existing){
            return res.json(failed("User already in room"))
        } else {
            const newData = new IUserInRoom()
            newData.idRoom = payload.idRoom
            newData.idUser = payload.idUser
            const result = await newData.save()
    
            return res.send(success("Successfully join room", result))
        }
    }

    static leave: RequestHandler = async (req, res) => {
        const payload = req.body

        const result = await IUserInRoom.delete({
            ...payload
        })
        
        res.send(success("Successfully leave room"))
    }

    static getAllUsersInRoom: RequestHandler = async (req, res) => {
        const { idRoom } = req.params

        const usersInRoom = await IUserInRoom.findBy({
            idRoom: +idRoom
        })

        res.send(success("Successfully get all user in room", usersInRoom))
    }

    static create: RequestHandler = async (req, res) => {
        try {
            const payload = req.body

            const result = await IRoom.create({
                    createdAt: new Date().toISOString(),
                    ...payload,
                    // name: payload.name,
                    // capacity: +payload.capacity,
                    // filled: +payload.filled,
                    // adminRoom: +payload.adminRoom,
                    // image: payload.image,
                    // status: payload.status,
                    // idCourse: payload.idCourse
                }).save()
            res.send(success("Successfully create room", result))
        } catch(e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await IRoom.find();
        
        res.send(success("Successfully get all room", result))
    }
} 