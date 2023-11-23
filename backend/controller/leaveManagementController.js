const Mongoose = require("mongoose");
const DailyReport = Mongoose.model("DailyReport");
const {FailResponse} = require('../utils/responses')

module.exports = {

    addReport  : async(req,res)=>{
        const date = new Date(`${(new Date().getMonth())+1}/${req.body.row}/${new Date().getFullYear()}`)
        try{  
            const userId = res.locals.decodedId
           const record = await DailyReport.findOne({date: date })
           if(record){
            await DailyReport.findByIdAndUpdate({_id : record._id},{ 
                status : req.body.status,
                reasonOfLeave : req.body.reason,
                DaysOfLeave : req.body.days,
            })

            res.send({
                status:"success",
                message:"updated successfully"
            })
           } else{
            
            await  DailyReport.create({
                status : req.body.status,
                reasonOfLeave : req.body.reason,
                DaysOfLeave : req.body.days,
                date : date,
                user:  userId
            })
            
            res.send({
                status:"success",
                message:"added successfully"
            })
           }  
         
    }catch(err){
        console.log(err)
        res.status(400).send({
            ...FailResponse
        })
    }
    },
    
    getReport : async(req,res)=>{
        console.log("get leaves route reached")
         try{
            const userId = res.locals.decodedId
            const reports = await DailyReport.find({
                user : userId
            })
            
           return res.status(200).send({
                message : "success",
                reports : reports 
            })

        }catch(err){
            console.log(err)
            res.status(400).send({
                ...FailResponse
            })
        }
    }

}