const express=require('express')
const app=express();
require('dotenv').config()
const connectWithDb=require('./config/db')

app.use(express.json())

connectWithDb()

app.listen(5000,()=>{
    console.log("Server is running on PORT 5000")
})

const user=require('./routes/user')
app.use("/api/user",user)