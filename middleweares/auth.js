const jwt =require("jsonwebtoken")
const userModel=require("../models/auth")

const jwtKey="MY_KEY_123456789";

const validateUser= async (req,res,next)=>{
    const headers=req.headers

    if(!headers.authorization){
        return res.status(401).json({
            message:"chala ja ******** from token"
        })
    }



    try {  
        jwt.verify(headers.authorization,jwtKey)
    } catch (error) {
        return res.status(401).json({
            message:"chala ja ******** from key"
        })
    }

    const tokenData=jwt.decode(headers.authorization)
    // console.log(tokenData);

    const tokenExp=tokenData.exp;
    const now=Math.ceil(new Date().getTime()/1000)
    if(tokenExp<now){
        return res.status(401).json({
            message:"chala ja ******** from exp"
        })
    }

    const tokenGeneratedTime=tokenData.iat;    // this is from which time it will response
    if(tokenGeneratedTime>now){
        return res.status(401).json({
            message:"chala ja ******** from time limit"
        })
    }

    const userId=tokenData.userId
    const user=await userModel.findById(userId)
    if(!user){
        return res.status(401).json({
            message:"chala ja ******** from user id"
        })
    }

    req.user=user;

    next();
}


module.exports=validateUser;