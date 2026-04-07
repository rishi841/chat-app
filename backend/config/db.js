const { default: mongoose } = require("mongoose")

const connectdb=async()=>{
    try {
        let res=await mongoose.connect(process.env.MONGO_URI)
        if(res){
            console.log("connected succesfully")
        }
    } catch (error) {
        console.log("Error in DB connection",error)
    }
}

module.exports=connectdb