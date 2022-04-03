import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken'
import { failed } from '../utils/response-builder';
import { env } from 'process';

export const AuthMiddleware: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, env.TOKEN_SECRET || "", (err: any, decoded: any) => {
            if (err) {
                res.send(failed("Failed to authenticate token", err));
            } else {
                next();
            }
        });
    } else {
        res.send(failed("No token provided", {}));
    }
}