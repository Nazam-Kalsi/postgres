import  express from "express";
// import './types';
import  { connection }  from "./db/db";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connection().then(()=>{
   app.on("error",(error)=>{
      console.log("error occur",error)
   })

   app.listen(3000, ()=>{
      console.log("Server is running on port 3000🚀");
   })
    
}).catch((error)=>{
   console.log("error occur",error)
})

app.get("/",(req,res)=>{
   res.json("hello world ")
})

import userRoutes from "./routes/user.route";
app.use("/user", userRoutes);

import postRoutes from "./routes/post.route";
app.use("/post", postRoutes);