import { Client } from "pg";
import { exit } from "process";
import { readFileSync } from "fs";
export const client = new Client({
    user: "test",
    password: 'test',
    host: 'localhost',
    port: 5432,
    database: 'myDB',
  });

export const connection = async () =>{
    try {
        await client.connect();   
        console.log("Connected to the database successfully.");
        await init();
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        exit(1);
    }
}

const init = async() => {
    try {
        const sql = readFileSync('./src/db/schema.sql', 'utf-8');
        await client.query(sql);
    } catch (error) {
        console.log("error occur while initializing the database", error);
        exit(1);
    }
}