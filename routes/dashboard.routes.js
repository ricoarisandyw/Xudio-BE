"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const dashboardRouter = express_1.default.Router();
dashboardRouter.get("/", dashboard_controller_1.default.getDashboard);
exports.default = dashboardRouter;
