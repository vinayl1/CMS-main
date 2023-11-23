const sendEmail = require('../utils/SendEmail')
const { emailQueue } = require('./main')
const emailQueueProcess = async()=>{
    console.log("reached")
    try{
        emailQueue.process(async(job,done)=>{
            await  sendEmail.festiveEmail(job.data.email,'Eid Wishes')
            done()     
        })  
    }catch(err){
        // console.log("----->",err)
    }
}

module.exports = emailQueueProcess