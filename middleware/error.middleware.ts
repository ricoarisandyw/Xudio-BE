import { RequestHandler } from "express";
import { failed } from "../utils/response-builder";

export const ErrorMiddleware: RequestHandler = (req, res, next) => {
    try {
        next()
    } catch (e) {
        res.send(failed("error", e))
    }
}