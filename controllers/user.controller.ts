import bcrypt from 'bcrypt';
import { RequestHandler } from "express";
import { In } from 'typeorm';
import { AppDataSource } from '../src/data-source';
import { ICourse } from '../src/entity/ICourse';
import IRoom from '../src/entity/IRoom';
import IUser from "../src/entity/IUser";
import IUserDetail from '../src/entity/IUserDetail';
import IUserInCourse from '../src/entity/IUserInCourse';
import { IUserInRoom } from '../src/entity/IUserInRoom';
import { checkEncrypt, encrypt } from "../utils/encrypt";
import { generateAccessToken, getIdFromJWT, logoutJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

export default class UserController {
    static getUserRoom: RequestHandler = async (req, res) => {
        try {
            if (req.headers.authorization) {
                let encryptedPassword = ''
                const id = getIdFromJWT(req.headers.authorization.replace('Bearer ', ''))

                const result = await IUserInRoom.findBy({
                    idUser: +id
                })

                const rooms = await IRoom.findBy({
                    id: In(result.map((r) => r.idRoom || 0))
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
                    updatedAt: new Date()
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
                const user = await IUser.findOne({
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
                const updatedUser = await IUser.findOneBy({
                        id: +id
                    });
                if(updatedUser){
                    updatedUser.password = encryptedPassword
                    updatedUser.save()
                }

                res.send(success("Successfully update password", updatedUser));
            } else {
                res.send(failed('Authorization not found', {}));
            }
        } catch (e) {
            res.send(failed("Failed to update password", e));
        }
    }

    static getAll: RequestHandler = async (req, res) => {
        const details = await IUserDetail.find()
        res.send(details)
        
        // console.log("GET ALL")
        // try {
        //     const users = await IUser.find();
        //     const userWithDetail = await Promise.all(users.map(async (user) => {
        //         const detail = await IUserDetail.findOne({
        //             where: {
        //                 idUser: user.id
        //             }
        //         });
        //         return convertNullToEmptyString({
        //             ...user,
        //             password: "",
        //             status: "active",
        //             detail: detail
        //         })
        //     }))

        //     res.send(success("Successfully get all users", userWithDetail));
        // } catch (error) {
        //     res.send(failed("Failed to get all users", error));
        // }
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
            res.send({ status: "success", message: "User successfully registered", data: saved });
        } else {
            res.status(500).send({ message: "Username already exist" });
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
            const existing = await IUserDetail.findOne({
                where: {
                    idUser: +iduser
                }
            })

            console.log({existing})
            console.log("Existing", existing, iduser, payload)
            if (existing) {
                const updated = await IUserDetail.update({
                    idUser: +iduser
                }, payload)
                res.send(success("Successfully update user detail", updated))
            } else {
                await AppDataSource.manager.create(IUserDetail, {
                    ...payload,
                    idUser: +iduser
                }).save()
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
                const user_detail = await IUserDetail.findOne({
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
                const user = await IUser.findOne({
                    where: {
                        id: +iduser
                    }
                })
                console.log({ user })

                const user_detail = await IUserDetail.findOne({
                    where: {
                        idUser: +iduser
                    }
                })

                const courses = await IUserInCourse.find({
                    where: {
                        idUser: +iduser
                    }
                })

                const rooms = await IUserInRoom.find({
                    where: {
                        idUser: +iduser
                    }
                })

                res.send(success("Successfully get summary", {
                    "id": user?.id,
                    "email": user_detail?.email,
                    "image": user_detail?.image,
                    "name": user_detail?.name,
                    "nip": user_detail?.nip,
                    "role": user_detail?.role,
                    "completedCourse": courses.filter((c) => c.score).length,
                    "totalCourse": courses.filter,
                    "averageScore": courses.reduce((cur, c) => +c.score + cur, 0) / courses.length,
                    "roomJoined": rooms.length
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

    // static getCourse: RequestHandler = (req, res) => {
    //     res.send(success("Get Course", [
    //         {
    //             "uuid": "2",
    //             "name": "Course Soldering",
    //             "description": "Practice soldering",
    //             "companyID": "1",
    //             "progress": 0.3,
    //             "startCourseAt": "2022-01-10T14:06:55.441Z",
    //             "duration": 36000,
    //             "endCourseAt": "2022-01-10T14:06:55.441Z",
    //             "beginDate": "2022-01-10T14:06:55.441Z",
    //             "dueDate": "2022-01-10T14:06:55.441Z",
    //             "createdAt": "2022-01-10T14:06:55.441Z",
    //             "updatedAt": "2022-01-10T14:06:55.441Z"
    //         }
    //     ]));
    // }

    static getCourse: RequestHandler = async (req, res) => {
        const jwt = req.headers.authorization as string;

        const iduser = getIdFromJWT(jwt.replace("Bearer ", ""));
        const userInCourse = await IUserInCourse.findBy({
            idUser: +iduser
        })

        const courses = await ICourse.findBy({
            id: In(userInCourse.map((usr) => usr.idCourse))
        })

        res.send(success("Get Course", courses.map((c) => ({
            "uuid": "2",
            "companyID": "1",
            "progress": 1,
            "startCourseAt": "2022-01-10T14:06:55.441Z",
            "duration": 36000,
            "endCourseAt": "2022-01-10T14:06:55.441Z",
            ...c,
        }))));
    }
}

