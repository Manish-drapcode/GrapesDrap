const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        trim:true,
        maxlength:40,
    }
    , email:{
        type:String,
    },
    password:{
        type: String ,
    }
});

module.exports = mongoose.model("user", userSchema);

