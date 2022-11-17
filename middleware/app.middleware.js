"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMiddleware = void 0;
const data_source_1 = require("../src/data-source");
const AppMiddleware = (req, res, next) => {
    if (!data_source_1.AppDataSource.isInitialized) {
        data_source_1.AppDataSource.initialize()
            .then(() => {
            console.log("Successfully connect to DB");
            // here you can start to work with your database
            next();
        })
            .catch((error) => {
            console.log({ error });
            res.send({ message: "Failed to interact with DB" });
        });
    }
};
exports.AppMiddleware = AppMiddleware;
