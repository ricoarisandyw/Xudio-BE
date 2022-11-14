import { RequestHandler } from "express";
import { AppDataSource } from "../src/data-source";

export const AppMiddleware: RequestHandler = (req, res, next) => {
    if(!AppDataSource.isInitialized){
        AppDataSource.initialize()
        .then(() => {
            console.log("Successfully connect to DB")
            // here you can start to work with your database
            next()
        })
        .catch((error) => {
            console.log({error})
            res.send({message: "Failed to interact with DB"})
        })
    }
}