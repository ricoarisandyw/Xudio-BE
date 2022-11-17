"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const response_builder_1 = require("../utils/response-builder");
const ErrorMiddleware = (req, res, next) => {
    try {
        next();
    }
    catch (e) {
        res.send((0, response_builder_1.failed)("error", e));
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
