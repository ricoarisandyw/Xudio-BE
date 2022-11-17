"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const IVideo_1 = __importDefault(require("../src/entity/IVideo"));
const response_builder_1 = require("../utils/response-builder");
const prisma = new client_1.PrismaClient();
class VideoController {
}
exports.default = VideoController;
_a = VideoController;
VideoController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IVideo_1.default.create({
        link: payload.link
    }).save();
    res.send((0, response_builder_1.success)("Successfully add video", result));
});
VideoController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield IVideo_1.default.find();
    res.send((0, response_builder_1.success)("Successfully get all video", result));
});
