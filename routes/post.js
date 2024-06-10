const express=require("express")

const postController=require("../controllers/post")
const roleMiddleweare=require("../middleweares/roleMiddleweare")

const router=express.Router()

router.get("/", postController.listPost)      // view all post

router.get("/:id",postController.getpostById)       // view a specific post

router.post("/", postController.createPost);   // create a post

router.put("/:id" , postController.updatePostById)  // update a post

router.delete("/:id", postController.deletePostById)   // delete a post

module.exports=router