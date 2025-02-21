const mongoose = require("mongoose");

const connectDb = async() =>{
    //wI2eqxrd89OBiZHy
    // mongodb+srv://virenderdhillon104:Z8d7rRnxEq7TaCLh@cluster0.d3nhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    try{
        
        await mongoose.connect("mongodb://localhost:27017").then(() =>{
            console.log("Db connected");
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = {connectDb}