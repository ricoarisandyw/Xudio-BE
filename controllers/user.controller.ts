import { RequestHandler } from "express";
import { failed, success } from "../utils/response-builder";
import bcrypt from 'bcrypt';
import { generateAccessToken, getIdFromJWT, logoutJWT } from "../utils/jwt-util";
import { PrismaClient } from ".prisma/client";
import { encrypt, checkEncrypt} from "../utils/encrypt";
import { convertNullToEmptyString } from "../utils/json.util";
const prisma = new PrismaClient();

export default class UserController {
    static updateUser: RequestHandler = async (req, res) => {
        try {
            if(req.headers.authorization){
                let encryptedPassword = ''
                const id = getIdFromJWT(req.headers.authorization.replace('Bearer ', ''))
                const { oldPassword, newPassword } = req.body;
                const user = await prisma.user.findFirst({
                    where: {
                        id: +id
                    }
                });
                if (!user) {
                    res.send(failed('User not found', {}));
                }
                if (user && oldPassword && user.password) {
                    const check = await checkEncrypt(oldPassword, user.password);
                    if (!check) {
                        res.send(failed('Wrong password', {}));
                    }
                    encryptedPassword = await encrypt(newPassword);
                }
                const updatedUser = await prisma.user.update({
                    where: {
                        id: +id
                    },
                    data: { 
                        password: encryptedPassword
                    }
                });
                res.send(success("Successfully update password", updatedUser));
            } else {
                res.send(failed('Authorization not found', {}));
            }
        } catch(e){
            res.send(failed("Failed to update password", e));
        }
    }

    static getAll: RequestHandler = async (req, res) => {
        console.log("GET ALL")
        try {
            const users = await prisma.user.findMany();
            const userWithDetail = await Promise.all(users.map(async (user) => {
                const detail = await prisma.user_detail.findFirst({
                    where: {
                        iduser: user.id
                    }
                });
                return convertNullToEmptyString({
                    ...user,
                    password: "",
                    status: "active",
                    detail: detail ? detail : {}
                })
            }))

            res.send(success("Successfully get all users", userWithDetail));
        } catch (error) {
            res.send(failed("Failed to get all users", error));
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

    static createOrUpdateUserDetail: RequestHandler = async (req, res) => {
        const payload = req.body;
        const jwt = req.cookies.jwt
        const iduser = getIdFromJWT(jwt);

        try {
            const existing = await prisma.user_detail.findFirst({
                where: {
                    iduser: +iduser
                }
            })
            console.log("Existing", existing, iduser)
            if(existing){
                const updated = await prisma.user_detail.update({
                    where: {
                        id: existing.id
                    },
                    data: {
                        ...payload,
                        iduser: +iduser
                    }
                })
                res.send(success("Successfully update user detail", updated))
            } else {
                await prisma.user_detail.create({
                    data: {
                        ...payload,
                        iduser: +iduser
                    },
                })
                res.send(success("Successfully create user detail", {
                    payload
                }))
            }
        } catch (error) {
            res.send(error)
        }
    }

    static getUser: RequestHandler = async (req, res) => {
        console.log(req.headers)
        const jwt = req.headers.authorization as string;
        try {
            if(jwt){
                const iduser = getIdFromJWT(jwt.replace("Bearer ", ""));
                const user_detail = await prisma.user_detail.findFirst({
                    where: {
                        iduser: +iduser
                    }
                })
                const removeNull = JSON.parse(JSON.stringify(user_detail).replace(/null/g, "\"\""))
                res.send(success("Successfully get user", removeNull))
            } else {
                throw new Error("No token found")
            }
        } catch(e: any){
            res.send(failed(e.message, {}))
        }
    }

    static getSummary: RequestHandler = async (req, res) => {
        res.send(success("Successfully get summary", {
            "course":"4",
            "activeCourse":"3",
            "dueCourse":"1",
            "passCourse":"2",
            "notPassCourse":"2",
            "averageScore":"97",
            "roomJoined":"4",
        }))
    }

    static login: RequestHandler = async (req, res) =>{
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })
        if(user && user.password && await checkEncrypt(req.body.password, user.password)){
            const token = generateAccessToken({ id: user.id })
            res.cookie('jwt', token)
            res.send(success("Successfully logged in", {
                "userID": "1",
                "username": user.username,
                "isSuccess": true,
                "token": token
            }));
        } else {
            res.send(failed('Something wrong', {
                "message": "please check your username and password"
            }))
        }
    }

    static logout: RequestHandler = (req, res) => {
        res.cookie('jwt', logoutJWT())
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

