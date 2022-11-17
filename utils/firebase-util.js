"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/app"));
require("");
const config = {
    apiKey: "abcdefghijklmnopqrstuvwxyz",
    authDomain: "lintangwisesa.firebaseapp.com",
    databaseURL: "https://lintangwisesa.firebaseio.com",
    projectId: "lintangwisesa",
    storageBucket: "lintangwisesa.appspot.com",
    messagingSenderId: "1234567890",
    appId: "0:1234567890:web:1234567890abcde"
};
const fire = app_1.default.initializeApp(config);
