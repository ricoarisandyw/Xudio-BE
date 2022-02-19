import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

export default class CourseController {
    static startCourse: RequestHandler = (req, res) => {
        res.send(success("Start Course", {
            "idRoom": "laskdjliawdjlid"
        }));
    }

    static endCourse: RequestHandler = (req, res) => {
        res.send(success("End Course", {
            "score": 123
        }));
    }
}