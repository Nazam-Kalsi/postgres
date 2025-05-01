import  jwt  from "jsonwebtoken"

type userT ={
    userName:string;
    email:string;
    id:number
}

export const generateAccessToken = async(user:userT) => {
   try{
      const accessToken = await jwt.sign(
         user,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any
        }
      );
      return accessToken;
   }catch(err){
      console.log("error while generating access token",err);
      return null;
   }
}
// export const generateRefreshToken = async(user:userT) => {
//     try{
//         const accessToken = await jwt.sign(
//         user,
//         process.env.ACCESS_TOKEN_SECRET as string,
//         {expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string, 10) || '1h'});

//         return accessToken;
//     }catch(err){
//         console.log("error while generating access token",err);
//         return null;
//     }
// }