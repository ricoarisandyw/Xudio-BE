import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

export default class UserController {
    static getUser: RequestHandler = async (req, res) => {
        res.send(success("Successfully get user", {
            "uuid":"1",
            "email":"alucard@mail.com",       
            "image":"https://i.picsum.photos/id/45/200/200.jpg?hmac=D9U6XUZsrWfv7UlIM9gKYtENGZ6jeG3H6qGxMT5gxsY",
            "name":"Alucard",
            "nip":"1234",
            "password":"123456",
            "role":"admin",
            "createdAt":"2022-01-10T14:06:55.441Z",
            "updatedAt":"2022-01-10T14:06:55.441Z"
        }))
    }

    static getSummary: RequestHandler = async (req, res) => {
        res.send(success("Successfully get summary", {
            "course":"4",
            "activeCourse":"3",
            "dueCourse":"1",
            "passCourse":"2",
            "notPassCourse":"2"
        }))
    }

    static login: RequestHandler = (req, res) =>{
        res.send(success("Authenticated", {
            "userID": "1",
            "isSuccess": true,
            "token": "djso99sd8djisdjsidsjisdjis"
        }));
    }

    static logout: RequestHandler = (req, res) => {
        res.send(success("Logout", {
            "isSuccess": true
        }));
    }   

    static getCourse: RequestHandler = (req, res) => {
        res.send(success("Get Course", [
            {
              "uuid":"2",
              "name":"Course Soldering",
              "description":"Practice soldering",
              "companyID":"1",
              "progress": 0.3,
              "startCourseAt": "2022-01-10T14:06:55.441Z",
              "duration": 36000,
              "endCourseAt": "2022-01-10T14:06:55.441Z",
              "beginDate":"2022-01-10T14:06:55.441Z",
              "dueDate": "2022-01-10T14:06:55.441Z",
              "createdAt":"2022-01-10T14:06:55.441Z",
              "updatedAt":"2022-01-10T14:06:55.441Z"
            }
        ]));
    }
}

