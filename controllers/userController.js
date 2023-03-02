const mongoose=require("mongoose")
const BigPromise=require('../middleware/bigpromise')
const User=require('../models/user')
const bcrypt=require('bcryptjs')

exports.signup=BigPromise(async (req,res)=>{
    
    const {name,email,password}=req.body

    const user1=await User.findOne({email:email})
    
    if(user1){
        return res.status(400).json({
            message:"User ALREADY EXSIST"
        })
    }
    if(!name || !email || !password){
       return res.status(401).json({
        success:true,
        message:"Please Provide The required Information"
       })
    }
    
   const user= await  User.create({
        name,
        email,
        password
    })

    const token=user.getJwtToken()

    res.status(200).json({
        success:true,
        user,
        token
    })
    
})

exports.signIn=BigPromise(async (req,res)=>{

    const {email,password}=req.body
    console.log("password "+password)

    const user=await User.findOne({email:email}).select("+password") 

    if(!user)
    {
        return res.status(404).json({
            message:"User does not exsist Plz Signup"
        })
    }

    if(!await  bcrypt.compare(password,user.password)){
       
        return res.status(401).json({
            message:"Password does not match "
        })
    }
    const token=user.getJwtToken()
    res.status(200).json({
        user,
        token
    })
    
})