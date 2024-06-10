const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    body: {
        type:String,
        require:false,
        default:"lorem iddn dikcndn knd"
    },
    tags:{
        type:Array,
        require:false,
        default:[]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

const postsModel=mongoose.model("posts",postSchema)

module.exports=postsModel