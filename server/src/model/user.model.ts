import { client } from "../db/db";

export const findUserByEmail = async(email:string)=>{
   try {
      const query = `SELECT * FROM USERS
                        WHERE email = $${1}`;    
      const res = await client.query(query,[email]);
      return res.rows[0];    
   } catch (error) {
      console.log("error while finding user", error);
      throw error;
   }
}