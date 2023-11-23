const Mongoose = require("mongoose");
const Project = Mongoose.model("Project");
const User = Mongoose.model("User");


module.exports = {
    createProject: async(req,res)=>{
    try{
        await Project.create(req.body)

        return res.status(200).send({
          message: "project created successfully"  
        })
    }catch(err){
        console.log(err)
    }    
}
,

addMemberToProject : async(req,res)=>{
    const {project_id,user_id} = req.body;
    try{
        console.log("add member to project reached")
        const project  =  await Project.findOne({_id:project_id})

        if(project){
            if(project.members.includes(user_id)){
               return res.status(400).send({
                    message : "user already exists"
                })
            }

            await Project.updateOne(
                {_id: project_id},
                { $push: { 'members': user_id } },
                {upsert: true}
                )
            await User.updateOne(
                {_id :user_id} ,
                { $push: { 'currentProjects': project_id } },
                {upsert: true}
                )

                return res.status(200).send({
                    message:"member added successfully"
                })            
        }
           return res.status(400).send({
                message: "Project doesnot exist"
            })
        
    }catch(err){
        console.log("---------->",err)
    }
}
,

    getProjects: async(req,res)=>{
        console.log("all projects route reached")
        try{
            const projects =  await Project.find({})
            .populate({
                path :'members',
                select:{
                    _id : 1,
                    firstname:1,
                    lastname:1,
                    email : 1,
                    image : 1
                }  
            })
            .exec()
           return res.send({projects})
        }catch(err){
            console.log(err)
            return res.status(400).send({
                status:"fail",
                message : "something went wrong" 
            })
        }
      
    }
,

    getProjectsByUser : async (req,res)=>{
       try{ 
        const id = res.locals.decodedId
        const projects = await Project.find({})
        let projectIds = []
         projects.map((item)=>{
            if(item.members.includes(id)){
                projectIds.push(item._id)
            }
        })

        const temp = await Project.find({"_id":{
            "$in" : projectIds
       }})

       return res.status(200).send({
            projects : temp
        })

    }catch(err){
        console.log(err)
    }
    }
}