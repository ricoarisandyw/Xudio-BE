import { RequestHandler } from "express";
import { In } from "typeorm";
import { ICourse } from "../src/entity/ICourse";
import IUserInCourse from "../src/entity/IUserInCourse";
import { getIdFromJWT } from "../utils/jwt-util";
import { failed, success } from "../utils/response-builder";

export default class ScoreController {
    static getScore: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || "";
        const iduser = getIdFromJWT(authorization.replace("Bearer ", ""));
        const allScores = await IUserInCourse.findBy({
                idUser: +iduser
            });

        const courses = await ICourse.find({
            where: {
                id: In(allScores.map(score => score.idCourse))
            }
        })

        // agregate
        const scores = allScores.reduce((acc, cur) => {
            const course = courses.find(
                (course) => cur.idCourse === course.id
            );
            acc.push({
                name: course?.name,
                description: course?.description,
                score: cur.score,
                beginDate: course?.beginDate,
                dueDate: course?.dueDate,
                startCourse: cur.startCourse,
                endCourse: cur.endCourse,
            });
            return acc;
        }, [] as any[]);

        res.send(success("Get Score", scores));
    }

    static addScore: RequestHandler = async (req, res) => {
        const payload = req.body
        const authorization = req.headers.authorization || ""
        const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const course = await IUserInCourse.findOne({
            where: {
                idCourse: payload.courseID,
                idUser: +iduser
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