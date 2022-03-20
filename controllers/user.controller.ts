import { RequestHandler } from "express";
import { error, success } from "../utils/response-builder";
import bcrypt from 'bcrypt';
import { generateAccessToken, getIdFromJWT } from "../utils/jwt-util";
import { mailgunClient } from "../utils/mailgun-util";
import { PrismaClient } from ".prisma/client";
import { encrypt, checkEncrypt} from "../utils/encrypt";
const prisma = new PrismaClient();

export default class UserController {
    static testPrisma: RequestHandler = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static signup: RequestHandler = async (req, res) => {
        try {
            const exist = await prisma.user.findFirst({
                where: {
                    username: req.body.username
                }
            });
            if(!exist){
                const user = await prisma.user.create({
                    data: {
                        username: req.body.username,
                        password: await encrypt(req.body.password),
                    }
                })
                await prisma.user_detail.create({
                    data: {
                        iduser: user.id,
                    }
                })
                res.send("User successfully registered");
            } else {
                res.send("Username already exist");
            }
        } catch(e: any){
            res.send(e.message)
        }
    }

    static getPassword: RequestHandler = async (req, res) => {
        const password = "12345"
        const encryptedPassword = await bcrypt.hash(password, 10);
        res.cookie('jwt', generateAccessToken({ userId: 'rico'}))
        res.send(success("Successfully get password", {
            password: encryptedPassword
        }))
    }

    static getUser: RequestHandler = async (req, res) => {
        const jwt = req.cookies.jwt
        try {
            if(jwt){
                const decoded = getIdFromJWT(jwt) as any;
                const user_detail = await prisma.user_detail.findFirst({
                    where: {
                        iduser: decoded.id
                    }
                })
                res.send(success("Successfully get user", user_detail))
            } else {
                throw new Error("No token found")
            }
        } catch(e: any){
            res.send(error(e.message, {}))
        }
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

    static login: RequestHandler = async (req, res) =>{
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })
        if(user && user.password && await checkEncrypt(req.body.password, user.password)){
            res.cookie('jwt', generateAccessToken({ id: user.id }))
            res.send(success("Successfully logged in", {
                "username": user.username,
            }));
        } else {
            res.send(error('Something wrong', {
                "message": "please check your username and password"
            }))
        }
    }

    static updateProfile: RequestHandler = async (req, res) => {
        const user = await prisma.user_detail.update({
            where: {

            },
            data: {

            }
        })
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

