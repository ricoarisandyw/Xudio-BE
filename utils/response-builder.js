"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failed = exports.success = void 0;
function success(message, data) {
    return {
        status: "success",
        message: message,
        data: data
    };
}
exports.success = success;
function failed(message, data = null) {
    return {
        status: "error",
        message: message,
        data: data
    };
}
exports.failed = failed;
