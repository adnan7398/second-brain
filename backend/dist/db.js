"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linkmodel = exports.contentmodel = exports.Tagsmodel = exports.Usermodel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const User = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const Tags = new mongoose_1.default.Schema({
    tittle: { type: String, required: true, unique: true },
});
const contentTypes = ['image', 'video', 'article', 'audio'];
const Content = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    // type:{type:String,enum:contentTypes,required:true},
    tittle: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tags', required: true }],
    UserId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true },
});
const link = new mongoose_1.default.Schema({
    hash: { type: String, },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'user', required: true },
});
exports.Usermodel = mongoose_1.default.model("user", User);
exports.Tagsmodel = mongoose_1.default.model("tags", Tags);
exports.contentmodel = mongoose_1.default.model("conten", Content);
exports.Linkmodel = mongoose_1.default.model("link", link);
