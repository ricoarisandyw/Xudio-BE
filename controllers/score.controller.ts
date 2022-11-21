import { RequestHandler } from "express";
import IUserInCourse from "../src/entity/IUserInCourse";
import { getIdFromJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

export default class ScoreController {
    static getScore: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || "";
        const iduser = getIdFromJWT(authorization.replace("Bearer ", ""));

        const course = await IUserInCourse.findOneBy({
            idUser: +iduser,
            idCourse: req.body.idCourse,
        })

        res.send(success("Successfully Get Score", course));
    }

    static addScore: RequestHandler = async (req, res) => {
        const payload = req.body
        const authorization = req.headers.authorization || ""

        // * id user is payload because admin / system who made it.
        // const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))

        const course = await IUserInCourse.findOne({
            where: {
                idCourse: payload.idCourse,
                idUser: payload.idUser
            }
        })
        if(course){
            const result = await IUserInCourse.update({
                id: course.id
            },{
                score: payload.score
            })

            res.send(success("Successfully add score", result));
        } else {
            res.send(failed("Failed to add score", {}));
        }
    }
}