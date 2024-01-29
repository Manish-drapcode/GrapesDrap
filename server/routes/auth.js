
const router = require("express").Router();
const user = require('../Modules/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv/config');
const GrapesJsProject = require('../Modules/GrapesJsProject')

const redis = require('redis');
const client = redis.createClient();
client.connect().then(()=>{console.log("connected");}).catch((e)=>console.error(e));

router.post('/signup',async(req,res)=>{

   
    try{
        const {username , useremail, userpassword}= req.body; 
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        console.log(req.body);
    const hashedPassword = await bcrypt.hash(userpassword,salt);
        
    const user_details = new user({
        name : username ,
        email:useremail,
        password:hashedPassword,
    });
    console.log("userdetails ",user_details);
    const saveUser = await user_details.save();
    
    res.status(200).send({user:saveUser});
    }
    catch(err){
        console.log(err);
    res.status(400).send({success:false , mes:err});
    }  

    });

router.get('/login',async(req,res)=>{
    if (req.query.username == null){
        console.log(req.query);
        console.log("no data is found ");
        res.status(400).send({message:"No Data found in body "});
        res.end();
    }
    else
   {     try{
        
            const details = await user.findOne({name:req.query.username});
            console.log(details);
            console.log("request body for login:",req.query);
            const match = await bcrypt.compare(req.query.userpassword,details.password);
            console.log(process.env.TOKEN_SECRET);
            const accessToken = jwt.sign(JSON.stringify(details),process.env.TOKEN_SECRET);
    
            if(match){
            res.status(200).send({message:"Successfull"})
            }
            else{
                res.json({message:"invalid credentials"});
            }

        }
        catch(err){
            console.log("error-login",err);
            res.status(400).send({success:false , mes:{err}});
        }}
})

router.get('/alldata',async(req,res)=>{

    try{
const response =  await user.find();
console.log(response);
res.status(200).json(response);
    }
    catch(error){
        console.log(error)
    }
})
router.delete('/crud',async(req,res)=>{
    const id=req.query;
    try{const response = await user.deleteOne({_id : id});
res.status(200).send({message:"sucessfull"})
}catch(error){console.log(error)}
    
})


// Endpoint to handle GrapesJS project storage

router.get('/projects/:id',async(req,res)=>{
    try {
        console.log("req.params" , req.params);
        const { id } = req.params;


        client.get(id, async(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send('Internal Server error');
            }
            else if(data){
                res.json(JSON.parse(data));
            }
            else{
                try{
                const project = await GrapesJsProject.findOne({ id });
                console.log(project);
                if (project) {
                  res.json({ data: project.data });
                } else {
                  res.status(404).json({ error: 'Project not found' });
                }
            }
            catch(error){
                console.log("this is internal error ",error);
            }
            }
        })
        
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})  

router.patch('/projects/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const { data } = req.body;
        console.log("this is called ");
        console.log({id})
        
        // Upsert the project (create if not exists, update if exists)
        const result = await GrapesJsProject.findOneAndUpdate(
          { id },
          { data },
          { upsert: true, new: true }
        );
        if(result.nModified>0){
            client.set(id,JSON.stringify(data));
            res.json({ data: result.data });
            res.send("the data update successfully ");
        }
        else{
            res.status(400).send('Page not found');
        }
        console.log(result);
  
        
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

module.exports=router;

