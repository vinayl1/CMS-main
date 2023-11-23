const { ExpressAdapter } = require('@bull-board/express');
const serverAdapter = new ExpressAdapter();
const Queue = require('bull');
const Redis = require('redis');

const redisUrl = process.env.REDIS_URL
const redisClient = Redis.createClient(
  {
        legacyMode: true,
        socket :{
          host: 'localhost',
          port: 6379,
        }
        
        // url: "redis://redis-container1:6379"
    }
    )
      
      redisClient.connect().then(()=>{
        // console.log("redis connected--------->")
    
      })
      .catch((err)=>{
        // console.log("redis is not connected : ",err)
      })
      // console.log(redisClient.connect())
      // redisClient.on("error", (error) => 
      // // console.error(`Error----------> : ${error}`)
      // );
  const emailQueue = new Queue('emailQueue'


  )
  emailQueue.on('progress', (job, result) => {console.log(`Job ${job.id} progress with result ${result}`); });
  emailQueue.on('completed', (job, result) => {console.log(`Job ${job.id} completed with result ${result}`); });
  emailQueue.on('failed', (job, result) => {console.log(`Job ${job.id} failed with result ${result}`); });
  emailQueue.on('stalled', (job, result) => {console.log(`Job ${job.id} stalled with result ${result}`); });
const { createBullBoard } = require('@bull-board/api');

const board= createBullBoard({
    queues: [],
    serverAdapter: serverAdapter,
  });
 

module.exports = {emailQueue,redisClient,serverAdapter,board}