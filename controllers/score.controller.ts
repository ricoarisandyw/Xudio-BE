import { RequestHandler } from "express";
import { getIdFromJWT } from "../utils/jwt-util";
import prisma from "../utils/prisma-util";
import { failed, success } from "../utils/response-builder";

export default class ScoreController {
    static getScore: RequestHandler = async (req, res) => {
        const authorization = req.headers.authorization || "";
        const iduser = getIdFromJWT(authorization.replace("Bearer ", ""));
        const allScores = await prisma.user_in_course.findMany({
            where: {
                iduser: +iduser
            }
        });

        const courses = await prisma.course.findMany({
            where: {
                id: {
                    in: allScores.map(score => score.idcourse)
                }
            }
        })

        // agregate
        const scores = allScores.reduce((acc, cur) => {
            const course = courses.find(
                (course) => cur.idcourse === course.id
            );
            acc.push({
                name: course?.name,
                description: course?.description,
                score: cur.score,
                beginDate: course?.begindate,
                dueDate: course?.duedate,
                startCourse: cur.startcourse,
                endCourse: cur.endcourse,
            });
            return acc;
        }, [] as any[]);

        res.send(success("Get Score", scores));
    }

    static addScore: RequestHandler = async (req, res) => {
        const payload = req.body
        const authorization = req.headers.authorization || ""
        const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
        const course = await prisma.user_in_course.findFirst({
            where: {
                idcourse: +payload.courseID,
                iduser: +iduser
            }
        })
        if(course){
            const result = await prisma.user_in_course.update({
                where: {
                    id: course.id
                },
                data: {
                    score: payload.score
                }
            })

            res.send(success("Successfully add score", result));
        } else {
            res.send(failed("Failed to add score", {}));
        }
    }
}