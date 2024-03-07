const mongoose =require("mongoose")
require("dotenv").config()

// db connection 
const dbConnect =()=>{
        mongoose.connect(process.env.databse_url)
        .then(()=>{
                console.log("db connection is successful")
        })
        .catch((error)=>{
            console.log("connection issues in db ")
            console.log(error.message)
            process.exit(1)
        })
}
mongoose.exports=dbConnect