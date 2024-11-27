// add npm install -d @types/express
import express from "express";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://adnan7398:781786%40Aa@cluster0.goqn5.mongodb.net/secondbrain");
import jwt from "jsonwebtoken";
import z from "zod"; 
import { JWT_SECRET } from "./config";
import { contentmodel, Linkmodel, Usermodel } from "./db";
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
import { Usermiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"

app.use(cors());
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
                message:"user already Exist"
            })
            errorthrown = true;
        }
        if(!errorthrown){
            res.status(200).json({
                message:"You Are successfuly signed Up"
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
            token:token,
            message:"You are succesfully login"
        })
    }else{
        res.status(403).json({
            message:"invalid username or password"
        })
    }
})
app.post("/api/vi/content",Usermiddleware,async(req,res)=>{
    const link = req.body.link;
    const tittle= req.body.tittle;
    await contentmodel.create({
        link,
        tittle,
        userId:req.userId, 
        tags:[]   
    })
    res.json({
        messsage:"content added"
    })

})
app.get("/api/vi/content",Usermiddleware,async(req,res)=>{
    const content = await contentmodel.find({
        userId:req.userId, 
    }).populate("userId","email");
    res.json({
        content
    })
})
app.delete("/api/vi/contents",Usermiddleware,async(req,res)=>{
    await contentmodel.deleteOne({
        userId : req.userId
    })
    res.json({
        Message:"content deleted"
    })

})

app.post("/api/vi/brain/shares",Usermiddleware, async (req,res)=>{
    const share = req.body.share;
    try{
        if(share){
            const existinglink = await Linkmodel.findOne({
                userId:req.userId
            });
            if(existinglink){
                res.json({
                    hash:existinglink.hash
                })
                return;
            }
            const hash = random(10);
            await Linkmodel.create({
            userId:req.userId,
            hash:hash
            });

            res.json({
                hash
            })
        }
        else{
            await Linkmodel.deleteOne({
                userId : req.userId
            });
            res.json({
                message:"link has been removed"
            })
            return;
    }
    res.json({
        message:"updated Sharable link ",
    })
}catch(e){
    res.status(400).json({
        message:"unable to updated shareable link "
    })
}

});

app.get("/api/vi/brain/:sharelink",async(req,res)=>{
    const hash = req.params.sharelink;
    const link = await Linkmodel.findOne({
        hash
    });
    if(!link||!hash){
        res.status(411).json({
            message:"sorry incorrect input "
        })
        return;
    }// userid to mil giy 
   
    const content = await contentmodel.find({
        userId:link.userId
    })
    const user = await Usermodel.findOne({
        _id:link.userId.toString()
    })
    if(!user){
        res.status(411).json({
            message:"user not found , error should ideally not happed  "
        })
        return;
    }
    res.json({
        email:user.email,
        content :content

    })
})
app.listen(3000);