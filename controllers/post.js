const postModel=require("../models/post")

const listPost= async (req,res)=>{

   const result= await postModel.find().populate("userId");

    // console.log(headers);
     res.json({
        result
     })
}

const createPost = async (req, res) => {
    console.log(req.user._id);
    const newPost = new postModel({ ...req.body, userId: req.user._id });
    await newPost.save();
    res.json({
      msg: "Post created successfully",
    });
};

const getpostById=async (req,res)=>{
    const postId=req.params.id;
    const post= await postModel.findById(postId).populate("userId")
    res.json({
         result:post
    })
}

const updatePostById=async (req,res)=>{
    const postId=req.params.id
    await postModel.findByIdAndUpdate(postId,req.body)
    res.json({
        message:"post update succesfully"
    })
}

const deletePostById=async (req,res)=>{
    const postId=req.params.id
    await postModel.findByIdAndDelete(postId)
    res.json({
        message:"post deleteted successfully"
    })
}





const postController={
    listPost,
    createPost,
    getpostById,
    updatePostById,
    deletePostById
}

module.exports=postController