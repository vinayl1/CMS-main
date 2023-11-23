const mongoose = require("mongoose");
const dailyReportSchema = new mongoose.Schema({
    date : {
        type:String
    },
    status:{
        type:String
    },
    reasonOfLeave:{
        type:String
    },
    DaysOfLeave :{
        type: String 
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,   
        ref:"User"
    }
})
mongoose.model('DailyReport',dailyReportSchema);