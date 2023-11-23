const mongoose = require("mongoose");
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
    firstname: {
        type:String
    },
    lastname:{
        type:String
    },
    email: {
        type:String
    },
    position:{
        type:String
    },
    password : {
        type:String
    },
    image :{
        type:String
    },
    dob:{
       type:String 
    },
    isManager  : {
        type:Boolean
    },
    manager:{
        type:String
    },

    dateOfJoining:{
        type: String
    },
    presents:{
        type:Number
    },
    leaves:{
       type:Number 
    },
    verified: { type: Boolean, default: false },
    currentProjects : {
        type:[
            {
            type:mongoose.Schema.Types.ObjectId,   
            ref:"Project"
        }  
    ] 
    }

})


mongoose.model('User', userSchema);



const validate = (data) => {
    const schema = Joi.object({
      firstname: Joi.string().required().label("firstname"),
      lastname: Joi.string().required().label("lastname"),
      position: Joi.string().required().label("position"),
      email: Joi.string().email().required().label("email"),
      password: passwordComplexity({min: 20,max : 100}).required().label("password"),
    });
    return schema.validate(data);
  };



 module.exports =  {validate} 