import { NextFunction ,Request,Response} from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
export function Usermiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"];
    const  decoded = jwt.verify(token as string,JWT_SECRET);
    if(decoded){
       // @ts-ignore
        req.userId = decoded.userId
        next();
    }else{
        res.status(403).json({
            message:"you are not logged in"
        })
    }
}
