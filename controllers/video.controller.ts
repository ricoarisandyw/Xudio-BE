import { RequestHandler } from "express";
import IVideo from "../src/entity/IVideo";
import { success } from "../utils/response-builder";

export default class VideoController {
    static create: RequestHandler = async (req, res) => {
        const payload = req.body

        const result = await IVideo.create({
            link: payload.link
        }).save()
        res.send(success("Successfully add video", result))
    }

    static getAll: RequestHandler = async (req, res) => {
        const result = await IVideo.find()
        res.send(success("Successfully get all video", result))
    }
}