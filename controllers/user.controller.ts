import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt';
import { RequestHandler } from "express";
import IUser from "../src/entity/IUser";
import { checkEncrypt, encrypt } from "../utils/encrypt";
import { convertNullToEmptyString } from "../utils/json.util";
import { generateAccessToken, getIdFromJWT, logoutJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";
const prisma = new PrismaClient();

export default class UserController {
    static getUserRoom: RequestHandler = async (req, res) => {
        try {
            if (req.headers.authorization) {
                let encryptedPassword = ''
                const id = getIdFromJWT(req.headers.authorization.replace('Bearer ', ''))

                const result = await prisma.user_in_room.findMany({
                    where: {
                        idUser: +id
                    }
                })

                const rooms = await prisma.room.findMany({
                    where: {
                        id: {
                            in: result.map((r) => r.idRoom || 0)
                        }
                    }
                })

                // {"id", "name", "capacity", "filled", "createdAt", "updatedAt","image"}
                // parse
                const allRooms = rooms.map((r) => ({
                    id: r.id,
                    name: r.name,
                    capacity: r.capacity,
                    filled: r.filled,
                    image: "",
                    createdAt: r.createdAt,
                    updateAt: new Date()
                }))

                res.send(success("Successfully get my room", allRooms))
            } else {
                res.send(failed('Authorization not found', {}));
            }
        } catch (e) {
            res.send(failed("Failed to update password", e));
        }
    }

    static updateUser: RequestHandler = async (req, res) => {
        try {
            if (req.headers.authorization) {
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
        } catch (e) {
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
                        idUser: user.id
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
        const exist = await IUser.findOneBy({
            username: req.body.username
        })
        if (!exist) {
            const user = new IUser()
            user.username = req.body.username
            user.password = await encrypt(req.body.password)
            const saved = await user.save()
            res.send({ message: "User successfully registered", data: saved });
        } else {
            res.send({ message: "Username already exist" });
        }
    }

    static getPassword: RequestHandler = async (req, res) => {
        const password = "12345"
        const encryptedPassword = await bcrypt.hash(password, 10);
        res.cookie('jwt', generateAccessToken({ userId: 'rico' }))
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
                    idUser: +iduser
                }
            })
            console.log("Existing", existing, iduser, payload)
            if (existing) {
                const updated = await prisma.user_detail.updateMany({
                    where: {
                        idUser: +iduser
                    },
                    data: {
                        ...payload
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
            res.send({ message: error }).status(500)
        }
    }

    static getUser: RequestHandler = async (req, res) => {
        console.log(req.headers)
        const jwt = req.headers.authorization as string;
        try {
            if (jwt) {
                const iduser = getIdFromJWT(jwt.replace("Bearer ", ""));
                const user_detail = await prisma.user_detail.findFirst({
                    where: {
                        idUser: +iduser
                    }
                })

                const removeNull = JSON.parse(JSON.stringify(user_detail).replace(/null/g, "\"\""))

                // parse
                const response = {
                    id: removeNull.id,
                    email: removeNull.email,
                    image: removeNull.image,
                    name: removeNull.name,
                    nip: removeNull.nip,
                    role: removeNull.role
                }

                res.send(success("Successfully get user", response))
            } else {
                throw new Error("No token found")
            }
        } catch (e: any) {
            res.send(failed(e.message, {}))
        }
    }

    static getSummary: RequestHandler = async (req, res) => {
        console.log("GET SUMMARY")
        const jwt = req.headers.authorization as string;
        try {
            if (jwt) {
                // {"id", "email", "image", "name", "nip", "role"=["ADMIN","USER"], "completedCourse", "totalCourse", "averageScore", "roomJoined"="1234"}
                const iduser = getIdFromJWT(jwt.replace("Bearer ", ""));
                const user = await prisma.user.findFirst({
                    where: {
                        id: +iduser
                    }
                })
                console.log({ user })

                const user_detail = await prisma.user_detail.findFirst({
                    where: {
                        idUser: +iduser
                    }
                })
                console.log({ user_detail })

                const courses = await prisma.user_in_course.findMany({
                    where: {
                        iduser: +iduser
                    }
                })
                console.log({ courses })

                res.send(success("Successfully get summary", {
                    "id": user?.id,
                    "email": user_detail?.email,
                    "image": user_detail?.image,
                    "name": user_detail?.name,
                    "nip": user_detail?.nip,
                    "role": user_detail?.role,
                    "completedCourse": courses.length,
                    "totalCourse": courses.length,
                    "averageScore": courses.length,
                    "roomJoined": courses.length
                }))
            } else {
                res.send(failed("JWT false", {}))
            }
        } catch (e: any) {
            res.send(failed(e.message, {}))
        }
    }

    static login: RequestHandler = async (req, res) => {
        const user = await IUser.findOneBy({
            username: req.body.username
        })
        if (user && user.password && await checkEncrypt(req.body.password, user.password)) {
            const token = generateAccessToken({ id: user.id })
            res.cookie('jwt', token)
            res.send(success("Successfully logged in", {
                "id": user.id,
                "isSuccess": true,
                "token": token
            }));
        } else {
            res.status(500).send(failed('Something wrong', {
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
                "uuid": "2",
                "name": "Course Soldering",
                "description": "Practice soldering",
                "companyID": "1",
                "progress": 0.3,
                "startCourseAt": "2022-01-10T14:06:55.441Z",
                "duration": 36000,
                "endCourseAt": "2022-01-10T14:06:55.441Z",
                "beginDate": "2022-01-10T14:06:55.441Z",
                "dueDate": "2022-01-10T14:06:55.441Z",
                "createdAt": "2022-01-10T14:06:55.441Z",
                "updatedAt": "2022-01-10T14:06:55.441Z"
            }
        ]));
    }
}

