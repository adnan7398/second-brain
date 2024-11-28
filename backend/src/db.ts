import mongoose, { mongo, Types,model } from "mongoose";
const User = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})
const Tags = new mongoose.Schema({
    tittle:{type:String,required:true,unique:true},
})

const contentTypes = ['image', 'video', 'article', 'audio']; 

const Content = new mongoose.Schema({
    link:{type:String,required:true},
    type:{type:String,required:true},
    tittle:{type:String,required:true},
    tags:[{type:mongoose.Types.ObjectId,ref:'Tags',required:true}],
    userId:{type:mongoose.Types.ObjectId,ref:'User', required:true},
})

const link = new mongoose.Schema({
    hash:{type:String,},
    userId:{type:mongoose.Types.ObjectId,ref:'User', required:true,unique:true}, 
})


export const Usermodel = mongoose.model("User",User);
export const Tagsmodel = mongoose.model("tags",Tags);
export const contentmodel = mongoose.model("content",Content)
export const Linkmodel = mongoose.model("links",link);

