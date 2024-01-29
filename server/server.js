const express = require('express');
const cors = require('cors');
const app = express();
const connectMongo = require('./config/Connectmongo');
var bodyParser = require('body-parser')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.end("<h1> Hello world </h1>")
});


const userRoute=require('./routes/auth');
app.use("/user",userRoute);

// created server with port 3003 ;
app.listen(3003,()=>{
    //connectMongo();
    console.log("the server on port 3003");
});