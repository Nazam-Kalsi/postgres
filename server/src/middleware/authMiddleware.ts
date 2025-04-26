import  jwt from "jsonwebtoken";
import { handler } from "../helpers/handler";

export const verifyUser = handler(async(req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log("from middleware : ",token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    console.log(userInfo);
    if(!userInfo) throw new Error("Invalid token");
    req.user = userInfo; 
    next();
})