const jwt = require("jsonwebtoken");
  const authenticateToken  =  (req,res,next)=>{
    console.log("========>>>auth middleware reached")
    try{
            const token =  req.cookies.token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            res.locals.decodedId = decoded.id 
            next()
        }catch(err){
            res.locals.authenticated = false
            return  res.status(401).send({
                message : "unautherized"
            })
        }
    
}
module.exports = {authenticateToken}