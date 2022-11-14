import { RequestHandler } from "express";
import { ICourse } from "../src/entity/ICourse";
import IUserInCourse from "../src/entity/IUserInCourse";
import { getIdFromJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

export default class CourseController {
    static deleteCourse: RequestHandler = async (req, res) => {
        const { idCourse } = req.params;
        try {
            new ICourse()
            return res.json(success("Sucess", { message: "Course deleted" }));
        } catch (error) {
            return res.json(failed("Failed", { message: "Error deleting course" }));
        }
    }

    static getCourse: RequestHandler = async (req, res) => {
        console.log(req.params.idCourse)
        const course = await ICourse.findOne({
            where: {
                id: +req.params.idCourse
            }
        })
        res.send(success("Successfully get course", course))
    }

    static getAllCourse: RequestHandler = async (req, res) => {
        const courses = await ICourse.find()
        res.send(success("Successfully get all course", courses))
    }

    static startCourse: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || ""
        const idUser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const { idCourse } = req.params

        // check existing
        const userInCourse = await IUserInCourse.findOneBy({
                idUser: +idUser,
                idCourse: +idCourse
            })
        if (userInCourse) {
            res.send(failed("Failed to start course", { message: "User already in course" }))
        } else {
            const createResponse = await IUserInCourse.create({
                    idUser: +idUser,
                    idCourse: +idCourse,
                    startCourse: new Date(),
                    score: 0,
                }).save()

            res.send(success("Start Course", createResponse));
        }
    }

    static endCourse: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || ""
        const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const { score } = req.body

        const userInCourse = await IUserInCourse.findOne({
            where: {
                idUser: +iduser,
                idCourse: +req.params.idCourse
            }
        })
        console.log("User in Course", userInCourse)

        if(userInCourse && userInCourse.id){
            const updateResult = await IUserInCourse.update(userInCourse?.id,{
                score: +score,
                endCourse: new Date()
            })

            res.send(success("End Course", updateResult));
        } else {
            res.send(failed("user not found"))
        }
    }

    static upload: RequestHandler = (req, res) => {
        res.send(success("Upload", {
            "courseId": "122",
            "fileName": "admin",
            "fileURL": "www.oke.co/ini_gambar.png",
        }));
    }

    static createOrUpdate: RequestHandler = async (req, res) => {
        const payload = req.body
        console.log("Payload", payload)
        try {
            if (payload.id) {
                const result = await ICourse.update(payload.id, {
                    ...payload
                })
                res.send(success("Successfully update course", result))
            } else {
                const result = await ICourse.create({
                    ...payload
                }).save()
                res.send(success('Create course', result))
            }
        } catch (error: any) {
            console.log(error)
            res.send(failed('Something wrong', {
                message: error.message
            }))
        }

    }

}