const express= require("express")
const app=express()
require("dotenv").config()

// 
const port=process.env.PORT|| 3000
//  mounting express middlewares
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("this is homepage ")
})
const dbConnect=require("../backend/config/db")
dbConnect()


app.listen(3000,()=>{
    console.log(`app is successfully running at ${port}`)
})