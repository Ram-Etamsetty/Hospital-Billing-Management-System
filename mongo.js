const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/billing")
.then(()=>{
    console.log("mongoose connected");
})
.catch((e)=>{
    console.log("failed to connect");
})

const LoginSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LoginCollection = new mongoose.model('Logincollection',LoginSchema)
module.exports = LoginCollection