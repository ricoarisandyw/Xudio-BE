import { RequestHandler } from "express";
import { ICourse } from "../src/entity/ICourse";
import IRoom from "../src/entity/IRoom";
import IUser from "../src/entity/IUser";
import { success } from "../utils/response-builder";

export default class DashboardController {
    static getUserDashboard = () => {
        return {
            completedCourse:"",
            averageScore:"",
            roomJoined: "",
            totalCourse:""
        }
    }

    static getActiveRoom = () => {
        return IRoom.count()
    }

    static getUsers = () => {
        return IUser.count()
    }

    static getCourses = () => {
        return ICourse.count()
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
                activeRoom: rooms,
                activeUser: users,
                activeCourse: courses
            }))
        })
    }
}