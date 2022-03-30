import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
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

    static getCourse: RequestHandler = (req, res) => {
        res.send(success("Successfully get course", {
            "uuid": "2",
            "name": "Course Soldering",
            "description": "Practice soldering",
            "companyID": "1",
            "beginDate": "2022-01-10T14:06:55.441Z",
            "dueDate": "2022-01-10T14:06:55.441Z",
            "createdAt": "2022-01-10T14:06:55.441Z",
            "updatedAt": "2022-01-10T14:06:55.441Z"
        }))
    }

    static getAllCourse: RequestHandler = async (req, res) => {
        const courses = await prisma.course.findMany()
        res.send(success("Successfully get all course", courses))
    }

    static startCourse: RequestHandler = (req, res) => {
        res.send(success("Start Course", {
            "idRoom": "laskdjliawdjlid"
        }));
    }

    static endCourse: RequestHandler = (req, res) => {
        res.send(success("End Course", {
            "score": 123
        }));
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
            if(payload.id){
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
        } catch(error: any){
            console.log(error)
            res.send(failed('Something wrong', {
                message: error.message
            }))
        }
        
    }

}