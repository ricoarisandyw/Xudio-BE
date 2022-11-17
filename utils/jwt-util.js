"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutJWT = exports.getIdFromJWT = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
function generateAccessToken(data) {
    if (process_1.env.TOKEN_SECRET) {
        return jsonwebtoken_1.default.sign(data, process_1.env.TOKEN_SECRET, { expiresIn: '10000s' });
    }
    else {
        throw new Error('Token secret not found');
    }
}
exports.generateAccessToken = generateAccessToken;
function getIdFromJWT(token) {
    if (process_1.env.TOKEN_SECRET) {
        const decoded = jsonwebtoken_1.default.verify(token, process_1.env.TOKEN_SECRET);
        return decoded.id;
    }
    else {
        throw new Error('Token secret not found');
    }
}
exports.getIdFromJWT = getIdFromJWT;
function logoutJWT() {
    if (process_1.env.TOKEN_SECRET) {
        return jsonwebtoken_1.default.sign({}, process_1.env.TOKEN_SECRET, { expiresIn: '0s' });
    }
    else {
        throw new Error('Token secret not found');
    }
}
exports.logoutJWT = logoutJWT;
