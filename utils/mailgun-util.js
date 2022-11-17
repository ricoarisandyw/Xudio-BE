"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailgunClient = void 0;
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mailgunClient = mailgun.client({
    username: 'api',
    key: 'cbb6f4611d6993c52cfc3056f4433564-1b237f8b-5cf243f0'
});
exports.mailgunClient = mailgunClient;
