const express=require("express")
const mongoose=require("mongoose")

const authRoutes=require("./routes/auth")
const postRoutes=require("./routes/post")
const authMiddleweares=require("./middleweares/auth")

const app=express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/authapp")
.then(()=>console.log("DB connect success"))
.catch((error)=>console.log("An error accour while connecting to DB"))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/posts",authMiddleweares,postRoutes)

app.listen(8080,()=>console.log("app is up and running on port number 8080"))