import { client } from "../../db/db";

export const create = async (schema: string, data: any) => {
   try {
      const columns = Object.keys(data).join(", ");
      const placeHolders = Object.values(data)
         .map((_, i) => `$${i + 1}`)
         .join(", ");
      const query = `INSERT INTO ${schema} (${columns}) VALUES (${placeHolders}) RETURNING *`;
      const values = Object.values(data);
      const result = await client.query(query, values);
      return result.rows[0];
   } catch (error) {
      console.log("Error While creating record in DB : ", error);
      throw error;
   }
};

export const findById = async (schema: string, id: number) => {
   try {
      const query = `SELECT * FROM ${schema} WHERE id = $1`;
      const result = await client.query(query, [id]);
      return result.rows[0];
   } catch (error) {
      console.log("Error While getting record from DB : ", error);
      throw error;
   }
};

export const findAll = async (schema: string, page: number) => {
   try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const query = `SELECT * FROM ${schema} LIMIT $1 OFFSET $2`;
      const result = await client.query(query, [limit, offset]);
      return result;
   } catch (error) {
      console.log("Error While accessing record from DB : ", error);
      throw error;
   }
};

export const deleteById = async (schema: string, id: number) => {
   try {
      const query = `DELETE FROM ${schema} WHERE ID = $1 RETURNING *`;
      const result = await client.query(query, [id]);
      return result.rows[0];
   } catch (error) {
      console.log("Error While deleting record from DB : ", error);
      throw error;
   }
};

export const updateById = async (schema: string, id: number, data: any) => {
   try {
      const columns = Object.keys(data).join(", ");
      const placeHolders = Object.keys(data).map((_, i) => `$${i + 1}`).join(", ");
      const query = `UPDATE ${schema}
                   SET (${columns}) = ((${placeHolders}))
                   WHERE ID = $${Object.keys(data).length + 1}`;

      const values = [...Object.values(data), id];
      const result = await client.query(query, values);
    
      return result.rows[0];
   } catch (error) {
      console.log("Error While updating record in DB : ", error);
      throw error;
   }
};
