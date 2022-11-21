import { RequestHandler } from "express";
import ITeacher from "../src/entity/ITeacher";
import ITeacherInRoom from "../src/entity/ITeacherInRoom";
import { success } from "../utils/response-builder";

export default class TeacherController {
    static addTeacher: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await ITeacher.create(payload).save()
        res.json(success("Successfully add teacher", result))
    }

    static assignTeacher: RequestHandler = async (req, res) => {
        const payload = req.body
        const existing = await ITeacherInRoom.findBy({
            idRoom: +payload.idRoom
        })
        if(existing.length > 0){ 
            await ITeacherInRoom.update({
                idRoom: payload.idRoom
            },payload)
            res.json(success("Successfully update assigned teacher", payload))
        } else {
            const result = await ITeacherInRoom.create(payload).save()
            res.json(success("Successfully assign teacher", {
                idRoom: result.idRoom,
                idTeacher: result.idTeacher
            }))
        }
    }
}