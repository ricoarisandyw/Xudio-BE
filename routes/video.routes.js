"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_controller_1 = __importDefault(require("../controllers/video.controller"));
const videoRouter = express_1.default.Router();
videoRouter.post('/', video_controller_1.default.create);
videoRouter.get('/', video_controller_1.default.getAll);
exports.default = videoRouter;
