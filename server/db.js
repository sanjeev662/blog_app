require('dotenv').config()
const mongoose = require('mongoose');
const DB = process.env.mongoURI;

const connectToMongo = ()=>{
    mongoose.connect(DB).then(()=>console.log("connected to database"))
.catch((error)=>console.log("error"))
}

module.exports = connectToMongo;