import { PrismaClient } from ".prisma/client";
import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient()
export default class DashboardController {
    static getActiveRoom = () => {
        return prisma.room.findMany({
            where: {
                status: "ACTIVE"
            }
        })
    }

    static getUsers = () => {
        return prisma.user.findMany()
    }

    static getCourses = () => {
        return prisma.course.findMany()
    }

    static getDashboard: RequestHandler = async (req, res) => {
        Promise.all([
            this.getActiveRoom(),
            this.getUsers(),
            this.getCourses(),
        ]).then(([
            rooms,
            users,
            courses
        ]) => {
            res.send(success("Successfully get dashboard data", {
                activeRoom: rooms.length,
                activeUser: users.length,
                activeCourse: courses.length
            }))
        })
    }
}