import { RequestHandler } from "express";
import { ICourse } from "../src/entity/ICourse";
import IUserInCourse from "../src/entity/IUserInCourse";
import { getIdFromJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

export default class CourseController {
    static joinCourse:RequestHandler = async (req, res) => {
        const { idCourse } = req.params
        const { idUser } = req.body

        try {
            // prevent join again
            const existing = await IUserInCourse.findOneBy({
                idUser: idUser,
                idCourse: +idCourse
            })
            
            if(existing) {
                return res.json(failed("User already join this course"))
            } else {
                const newData = new IUserInCourse()
                newData.idCourse = +idCourse
                newData.idUser = +idUser
                newData.score = 0
                const result = await newData.save()
                return res.json(success("Successfully join course", result))
            }
        } catch (e){
            console.log({e})
            return res.json(failed("Failed", { message: "Failed to join course, " + e }))
        }
    }

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

    static getUsersInCourse: RequestHandler = async (req, res) => {
        const all = await IUserInCourse.find();
        console.log({all})

        const course = await IUserInCourse.findBy({
            idCourse: +req.params.idCourse
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

        const existing = await IUserInCourse.findOneBy({
            idUser: +idUser,
            idCourse: +idCourse
        })
            
        if (existing) {
            existing.startCourse = new Date()
            existing.save()

            res.send(success("Successfully start course", existing));
        } else {
            res.send(failed("User not exist in that course"))
        }
    }

    static endCourse: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || ""
        const idUser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const { idCourse } = req.params

        const existing = await IUserInCourse.findOneBy({
            idUser: +idUser,
            idCourse: +idCourse
        })
            
        if (existing) {
            existing.endCourse = new Date()
            existing.save()

            res.send(success("Successfully end course", existing));
        } else {
            res.send(failed("User not exist in that course"))
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