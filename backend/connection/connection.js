const mongoose = require("mongoose");
try{
    mongoose.connect(
        process.env.MONGODB_URL,
        { useNewUrlParser: true },
        
      );
      console.log("db connected successfully")
}catch(err){
    console.log(err)
}




module.exports = mongoose.connect;
require("../models/users.model");
require("../models/projects.model");
require("../models/dailyreport.model");
require("../models/token.model");