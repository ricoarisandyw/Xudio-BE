import { PrismaClient } from ".prisma/client";
import { Request, RequestHandler, Response } from "express";
import { success } from "../utils/response-builder";

const prisma = new PrismaClient();

export default class MobileController {
    // {"id", "isSuccess", "token"}
    static async login(req: Request, res: Response){
        
    }
}