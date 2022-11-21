"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const data_source_1 = require("./src/data-source");
// SETUP ENV
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// LIBRARY
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// app.get('/', (req,res) => res.send('Express + TypeScript Server'));
data_source_1.AppDataSource.initialize().then(() => {
    console.error("Connected to DB");
    app.use('/api', error_middleware_1.ErrorMiddleware, routes_1.default);
}).catch((error) => {
    console.error(error);
    console.error("Failed to interact with DB");
});
app.listen(+PORT, '0.0.0.0', 0, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
exports.default = app;
