"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linkmodel = exports.contentmodel = exports.Tagsmodel = exports.Usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
const link = new mongoose_1.default.Schema({
    hash: { type: String, },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true },
});
exports.Usermodel = mongoose_1.default.model("User", User);
exports.Tagsmodel = mongoose_1.default.model("tags", Tags);
exports.contentmodel = mongoose_1.default.model("content", Content);
exports.Linkmodel = mongoose_1.default.model("links", link);
