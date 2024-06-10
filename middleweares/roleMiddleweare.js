const roleMiddleweare=(role)=>(req,res,next)=>{
   const user=req.user;
   if(role!==user.role){
    return res.json({
        message:"chala ja ***** tera role nhi hai ye"
    })
   }

   next()
}

module.exports=roleMiddleweare