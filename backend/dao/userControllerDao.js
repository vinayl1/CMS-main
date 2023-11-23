const Mongoose = require("mongoose");
require("../models/users.model");
const User = Mongoose.model("User");
const Token = require("../models/token.model");
const crypto = require("crypto");
module.exports = {
    createUser : async(body)=>{
        try{
            const created =  await User.create(body)
            return created
        }catch(err){
            console.log(err)
        }
        
    },

    findUser : async(email)=>{
        try{
            const user = await User.findOne({
                email:email
            })
            return user
        }catch(err){
            console.log(err)
        }
    },
    passCheck : async(givenPass,dbPass)=>{
        try{
            const validPass  =  await bcrypt.compare(
                givenPass,
                dbPass
            );
               return validPass 
        }catch(err){
            console.log(err)
        }
         
    },
    createToken : async()=>{
        try{
            const token = await new Token({
                userId: created._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            return token
        }catch(err){
            console.log(err)
        }
    }
    ,
    findUserById : async(id)=>{
        try{
            const user = await User.findById({ _id: id }).populate({
                path: "currentProjects",
              });

              return user
        }catch(err){
            consol.log(err)
        }
    } 

}