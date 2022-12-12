import { RequestHandler } from "express";
import { In } from "typeorm";
import IRole from "../src/entity/IRole";
import IUserInRole from "../src/entity/IUserInRole";
import { failed, success } from "../utils/response-builder";

export default class RoleController {
    static addRole: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await IRole.create(payload).save()

        res.json(success("Successfully add role", result))
    }

    static addUserRole: RequestHandler = async (req, res) => {
        const payload = req.body
        if(await IUserInRole.findOneBy({
            idRole: payload.idRole,
            idUser: payload.idUser
        })) {
            const result = await IUserInRole.create(payload).save()
            res.json(success("Successfully add user role", result))
        } else {
            res.json(failed("This user already added role"))
        }
    }

    static getUserRole: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await IUserInRole.findBy({
            idUser: payload.idUser
        })

        const role = await IRole.findBy({
            id: In(result.map((v) => v.idRole))
        })

        res.json(success("Successfully get user role", role))
    }

    static get: RequestHandler = async (req, res) => {
        const payload = req.body
        const result = await IUserInRole.findBy({
            idUser: payload.idUser
        })

        res.json(success("Successfully add role", result))
    }
}