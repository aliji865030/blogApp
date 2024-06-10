const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")

const jwtKey="MY_KEY_123456789"

const userModel=require("../models/auth")

const signup= async (req,res)=>{

    console.log(req.body);

    const salt= bcrypt.genSaltSync(10)  // to add more complexity of hasing th password (10) means algo run 10 times and make salt more complex
    console.log(salt);

    const passwordHash=bcrypt.hashSync(req.body.password,salt)
    console.log(passwordHash);

    const newUser=new userModel({...req.body,password:passwordHash})
    const newData=await newUser.save()
    console.log(newData._id);

    res.json({
        success:true,
        message:"Registration success, please login"
    })
}

const login= async (req,res)=>{
    const user= await userModel.findOne({email:req.body.email})
    // console.log(user);

    if(!user){
        return res.json({
            message:"user not found, please enter a valid email"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
   console.log(isPasswordValid);

    if(isPasswordValid){

        const tokenExp=Math.ceil(new Date().getTime()/1000)+3600      // 1 hrs validity

        const payLoad={
            userId:user._id,
            user_name:user.name,
            exp:tokenExp
        }

        const token= jwt.sign(payLoad,jwtKey)

        return res.json({
            token
        })
    }

    res.json({
        message:"invalid username or password"
    })
}

const authController={
    signup,
    login
}

module.exports=authController;