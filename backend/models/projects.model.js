const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    title:{
        type:String
    },
    startDate:{
        type:String
    },
    tenure:{
        type:String
    },
    manager:{
       type:String 
    },
    stack:{
        type:String
    },
    members:{
    type:[
        {
        type:mongoose.Schema.Types.ObjectId,   
        ref:"User"
    }
]
    }
})
mongoose.model('Project', projectSchema);