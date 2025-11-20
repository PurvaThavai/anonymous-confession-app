import { createConnection } from "mysql2/promise";

let connection = null;

export async function connectDB(){
    try{
        connection = await createConnection(
            {
                host : "localhost",
                user : "root",
                password : "cdac",
                port : 3306,
                database : "project"
            }
        );

        console.log("DB connected successfully!!!");
    }
    catch(error){
        console.log("Error in DB Connection");
        console.log(error);
    }
    
}

export function getConnectionObject(){
    return connection;
}