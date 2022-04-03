import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { getIdFromJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

const prisma = new PrismaClient();

export default class CourseController {
    static deleteCourse: RequestHandler = async (req, res) => {
        const { idCourse } = req.params;
        try {
            await prisma.course.delete({
                where: {
                    id: +idCourse
                }
            });
            return res.json(success("Sucess", { message: "Course deleted" }));
        } catch (error) {
            return res.json(failed("Failed", { message: "Error deleting course" }));
        }
    }

    static getCourse: RequestHandler = async (req, res) => {
        const course = await prisma.course.findFirst({
            where: {
                id: +req.params.idCourse
            }
        })
        res.send(success("Successfully get course", course))
    }

    static getAllCourse: RequestHandler = async (req, res) => {
        const courses = await prisma.course.findMany()
        res.send(success("Successfully get all course", courses))
    }

    static startCourse: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || ""
        const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const { idCourse } = req.params

        // check existing
        const userInCourse = await prisma.user_in_course.findFirst({
            where: {
                iduser: +iduser,
                idcourse: +idCourse
            }
        })
        if (userInCourse) {
            res.send(failed("Failed to start course", { message: "User already in course" }))
        } else {
            const createResponse = await prisma.user_in_course.create({
                data: {
                    iduser: +iduser,
                    idcourse: +idCourse,
                    startcourse: new Date(),
                }
            })

            res.send(success("Start Course", createResponse));
        }
    }

    static endCourse: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || ""
        const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const { score } = req.body

        const userInCourse = await prisma.user_in_course.findFirst({
            where: {
                iduser: +iduser,
                idcourse: +req.params.idCourse
            }
        })
        console.log("User in Course", userInCourse)
        const updateResult = await prisma.user_in_course.update({
            where: {
                id: userInCourse?.id
            },
            data: {
                score: +score,
                endcourse: new Date()
            }
        })

        res.send(success("End Course", updateResult));
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
                const result = await prisma.course.update({
                    where: {
                        id: payload.id
                    },
                    data: {
                        ...payload
                    }
                })
                res.send(success("Successfully update course", result))
            } else {
                const result = await prisma.course.create({
                    data: {
                        ...payload,
                        createdat: new Date().toISOString(),
                    }
                })
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