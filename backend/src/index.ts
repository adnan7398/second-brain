// add npm install -d @types/express
import express from "express";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://adnan7398:781786%40Aa@cluster0.goqn5.mongodb.net/secondbrain");
import jwt from "jsonwebtoken";
import z from "zod"; 
import { JWT_SECRET } from "./config";
import { Usermodel } from "./db";
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());


// dev means developement ke time use krte hain 

app.post("/api/vi/signup",async(req,res)=>{
        const requirebody= z.object({
            email:z.string().min(5).max(20).email(),
            password:z.string().min(8).max(20).refine((password)=>{
                const uppercase = /[A-Z]/.test(password);
                const lowercase = /[a-z]/.test(password);
                const specialchar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                return uppercase && lowercase && specialchar;
            }, {
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
            })
        });
        const parsedata = requirebody.safeParse(req.body);
        if(!parsedata.success){
            res.status(411).json({
                message:"Invalid credintial",
                error:parsedata.error
            })
            return 
        }
        const email = req.body.email;
        const password  = req.body.password;
        let errorthrown= false;
        try{
            const hashpassword = await bcrypt.hash(password,5);
            await Usermodel.create({
                email:email,
                password:hashpassword
            })
        }catch(e){
            res.status(403).json({
                message:"useralready Exist"
            })
            errorthrown = true;
        }
        if(!errorthrown){
            res.status(200).json({
                message:"You Are successfuly login"
            })
        }
})  

app.post("/api/vi/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const response = await Usermodel.findOne({
        email:email,
    })
    if(!response){
        res.status(403).json({
            message:"user does'nt exist"
        })
        return 
    }
    const comparepassword = await bcrypt.compare(password,response.password);
    if(comparepassword){
        const token = jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);
        res.status(200).json({
            message:"You are succesfully login"
        })
    }else{
        res.status(403).json({
            message:"invalid username or password"
        })
    }
})
app.get("api/vi/content",(req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    

})

app.delete("api/vi/content",(req,res)=>{

})

app.post("api/vi/shares",(req,res)=>{

})

app.get("api/vi/sharelink",(req,res)=>{

})
app.listen(3000);