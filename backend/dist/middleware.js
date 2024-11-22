"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermiddleware = Usermiddleware;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Usermiddleware(req, res, next) {
    const token = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "you are not logged in"
        });
    }
}
