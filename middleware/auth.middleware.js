"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const response_builder_1 = require("../utils/response-builder");
const AuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    if (token) {
        jsonwebtoken_1.default.verify(token, process_1.env.TOKEN_SECRET || "", (err, decoded) => {
            if (err) {
                res.send((0, response_builder_1.failed)("Failed to authenticate token", err));
            }
            else {
                next();
            }
        });
    }
    else {
        res.send((0, response_builder_1.failed)("No token provided", {}));
    }
};
exports.AuthMiddleware = AuthMiddleware;
