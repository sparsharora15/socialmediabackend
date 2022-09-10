const mongoose = require('mongoose')
const connectionUrl = "mongodb+srv://sparsharora15:sparsharora9627@cluster0.qcpeol2.mongodb.net/?retryWrites=true&w=majority"

exports.connect = async()=>{
    try{
    await mongoose.connect(connectionUrl)
    console.log("connnected to db");
}
catch(e){
    console.log(e);
}
}