require("dotenv").config();
const  express = require("express")
const app = express()
const cors = require('cors')
require("./connection/connection");
const sendEmail = require('./utils/SendEmail')
// const {emailQueue,serverAdapter}= require("./processes/main")
const cookieparser  = require("cookie-parser")
// const emailQueueProcess = require('./processes/emailQueueProcess') 

//-----------------------
// serverAdapter.setBasePath('/admin/queues');
// app.use('/admin/queues', serverAdapter.getRouter());

// emailQueue.process(async(job,done)=>{
//     await  sendEmail.festiveEmail(job.data.email,'Eid Wishes')
//     console.log("job processed --->>")
//     done()     
// })

//  emailQueue.process((job,done)=>{
//     emailQueueProcess(job,done)
// }).then(()=>{
//     console.log("job finished")
// }).catch((err)=>{
//     console.log("error is : ",err)
// })
    //  emailQueue.getJobCounts()
    //  .then((counts)=>{
    //     console.log(counts)
    //  })
//--------------------------
 app.use( cors({ credentials: true, origin: "http://localhost:5173" })
)
app.use(express.json())
app.use(cookieparser())

const userRouter = require('./routes/userRoute')
app.use('/',userRouter)
const porjectRouter = require('./routes/projectRoute')
app.use('/projects',porjectRouter)
const LeaveMangementRoute = require('./routes/LeaveMangementRoute')
app.use('/leaveManagement',LeaveMangementRoute)
app.listen(3333,()=>{
    console.log("app is running on port 3333")
})

module.exports= app