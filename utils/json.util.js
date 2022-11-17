"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNullToEmptyString = void 0;
const convertNullToEmptyString = (object) => {
    return JSON.parse(JSON.stringify(object).replace(/null/g, "\"\""));
};
exports.convertNullToEmptyString = convertNullToEmptyString;
