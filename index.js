"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const data_source_1 = require("./src/data-source");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 80;
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
