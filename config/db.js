const mongoose=require('mongoose');
mongoose.set('strictQuery',false) 

const connectWithDb=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("Connected With The databse !!!!!!!!"))
    .catch(error=>{
        console.log("Some Error Occured")
    })
}

module.exports=connectWithDb