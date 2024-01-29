const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set("strictQuery", true);
//console.log(process.env.DB_STRING);
//const mongoURI ="mongodb+srv://admin:admin@cluster0.irfq5v3.mongodb.net/?retryWrites=true&w=majority"
// console.log(process.env);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });


  