import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { failed } from '../utils/response-builder';

export const AuthMiddleware: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, env.TOKEN_SECRET || "", (err: any, decoded: any) => {
            console.log({err})
            if (err) {
                res.status(401).send(failed("Failed to authenticate token", err));
            } else {
                next();
            }
        });
    } else {
        res.status(500).send(failed("No token provided", {}));
    }
}