import { RequestHandler } from "express";
import { ILesson } from "../src/entity/ILesson";
import { success } from "../utils/response-builder";

export default class LessonController {
    static getLesson: RequestHandler = async (req, res) => {
        const lessons = await ILesson.find()
        return res.send(success("Successfully get lesson", lessons))
    }

    static getLessonByCourseId: RequestHandler = async (req, res) => {
        const { idCourse } = req.params
        console.log({idCourse})

        const lesson = await ILesson.findBy({
            idCourse: +idCourse
        })

        return res.send(success("Successfully get lesson", lesson))
    }

    static addLesson: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await ILesson.create(payload).save()
        return res.json(success("Successfully add lesson", result))
    }

    static updateLesson: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await ILesson.update({
            id: payload.id
        }, payload)
        return res.json(success("Successfully add lesson", result))
    }

    static deleteLesson: RequestHandler = async (req, res) => {
        const { idLesson } = req.params
        const result = await ILesson.delete({
            id: +idLesson
        })
        return res.json(success("Successfully delete lesson", result))
    }
}