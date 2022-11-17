"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const score_controller_1 = __importDefault(require("../controllers/score.controller"));
const scoreRouter = express_1.default.Router();
scoreRouter.get('/', score_controller_1.default.getScore);
scoreRouter.post('/', score_controller_1.default.addScore);
exports.default = scoreRouter;
