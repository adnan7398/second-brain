"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// add npm install -d @types/express
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://adnan7398:781786%40Aa@cluster0.goqn5.mongodb.net/secondbrain");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const config_1 = require("./config");
const db_1 = require("./db");
const bcrypt = require("bcrypt");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
// dev means developement ke time use krte hain 
app.post("/api/vi/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requirebody = zod_1.default.object({
        email: zod_1.default.string().min(5).max(20).email(),
        password: zod_1.default.string().min(8).max(20).refine((password) => {
            const uppercase = /[A-Z]/.test(password);
            const lowercase = /[a-z]/.test(password);
            const specialchar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            return uppercase && lowercase && specialchar;
        }, {
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
        })
    });
    const parsedata = requirebody.safeParse(req.body);
    if (!parsedata.success) {
        res.status(411).json({
            message: "Invalid credintial",
            error: parsedata.error
        });
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    let errorthrown = false;
    try {
        const hashpassword = yield bcrypt.hash(password, 5);
        yield db_1.Usermodel.create({
            email: email,
            password: hashpassword
        });
    }
    catch (e) {
        res.status(403).json({
            message: "user already Exist"
        });
        errorthrown = true;
    }
    if (!errorthrown) {
        res.status(200).json({
            message: "You Are successfuly signed Up"
        });
    }
}));
app.post("/api/vi/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const response = yield db_1.Usermodel.findOne({
        email: email,
    });
    if (!response) {
        res.status(403).json({
            message: "user does'nt exist"
        });
        return;
    }
    const comparepassword = yield bcrypt.compare(password, response.password);
    if (comparepassword) {
        const token = jsonwebtoken_1.default.sign({
            id: response._id.toString()
        }, config_1.JWT_SECRET);
        res.status(200).json({
            token: token,
            message: "You are succesfully login"
        });
    }
    else {
        res.status(403).json({
            message: "invalid username or password"
        });
    }
}));
app.post("/api/vi/content", middleware_1.Usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const tittle = req.body.tittle;
    yield db_1.contentmodel.create({
        link,
        tittle,
        userId: req.userId,
        tags: []
    });
    res.json({
        messsage: "content added"
    });
}));
app.get("/api/vi/content", middleware_1.Usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield db_1.contentmodel.find({
        userId: req.userId,
    }).populate("userId", "email");
    res.json({
        content
    });
}));
app.delete("/api/vi/contents", middleware_1.Usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.contentmodel.deleteOne({
        userId: req.userId
    });
    res.json({
        Message: "content deleted"
    });
}));
app.post("/api/vi/brain/shares", middleware_1.Usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    try {
        if (share) {
            const existinglink = yield db_1.Linkmodel.findOne({
                userId: req.userId
            });
            if (existinglink) {
                res.json({
                    hash: existinglink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.Linkmodel.create({
                userId: req.userId,
                hash: hash
            });
            res.json({
                hash
            });
        }
        else {
            yield db_1.Linkmodel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "link has been removed"
            });
            return;
        }
        res.json({
            message: "updated Sharable link ",
        });
    }
    catch (e) {
        res.status(400).json({
            message: "unable to updated shareable link "
        });
    }
}));
app.get("/api/vi/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.Linkmodel.findOne({
        hash
    });
    if (!link || !hash) {
        res.status(411).json({
            message: "sorry incorrect input "
        });
        return;
    } // userid to mil giy 
    const content = yield db_1.contentmodel.find({
        userId: link.userId
    });
    const user = yield db_1.Usermodel.findOne({
        _id: link.userId.toString()
    });
    if (!user) {
        res.status(411).json({
            message: "user not found , error should ideally not happed  "
        });
        return;
    }
    res.json({
        email: user.email,
        content: content
    });
}));
app.listen(3000);
