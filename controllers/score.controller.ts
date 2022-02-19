import { RequestHandler } from "express";
import { success } from "../utils/response-builder";

export default class ScoreController {
    static getScore: RequestHandler = (req, res) => {
        res.send(success("Get Score", [
            {
              "courseID":"2",
              "userID":"2",
              "score": "80"
            }
        ]));
    }

    static addScore: RequestHandler = (req, res) => {
        res.send(success("Add Score", {
            "isSuccess": true
        }));
    }
}