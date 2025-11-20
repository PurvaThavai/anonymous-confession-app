import {hashSync,compareSync} from "bcrypt"; //bcrypt : library for encrypting passwords || hashSync : used to convert plain text password into encrypted hash || compareSync : used to check if a plain password matched to the stored hash.
import jwt from "jsonwebtoken"; // jsonwbtoken : a library used to create JWT tokens for secure login session, keep users logged in safely without storing actual password
import { getConnectionObject } from "../configs/DBconfig.js"; // getConnectionObject : custom function that connects to mysql db and return the connection object for queries

// register user

export async function registerUser(request,response) {
    try{
        const connection = getConnectionObject(); // connection : created to interact with the database
        const {name,phone,email,password} = request.body; // contain user data send from frontendf
        const encryptedPassword = hashSync(password,12); //convert plain text into fixed length encrypted string that cannot be reversed back to the original password
        const qry = `INSERT INTO users (name,phone,email,password) VALUES('${name}','${phone}','${email}','${encryptedPassword}')`;
        const [resultSet] = await connection.query(qry); // executes the SQL query asynchromously || resultSet : stores the result
        if(resultSet.affectedRows === 1){
            response.status(200).send({ message : "User Registered"});
        }else{
            response.status(500).send({ message : "User Registration Failed"});
        } // means one more record successfully insrted if not then will give failure response
    }
    catch(error){ // handles any erros during registration
        console.log(error);
        if(error.errno === 1062){ // mysql error code for duplicate entry (if any credential already exists)
            response.status(400).send({ message : "User with this id already exists"});
        }else{
            response.status(500).send({ message : "Something went wrong"});
        }
    }
}

// user login
export async function userLogin(request,response){
    try{ //extract entered username and password from frontend. established db connection again
        const connection = getConnectionObject();
        const {name,password} = request.body;
        const qry = `SELECT * FROM users WHERE name ='${name}'`; //fethced the user record by their name
        const [rows] = await connection.query(qry); // rows: contain list of result
        if(rows.length === 0){ // if not found the message
            response.status(400).send({ message : "Login failed, username doesn't exist"});
        }else{ // 1st check entered password with encrypted db password . if matched with JWT token then sends back token and success msg
            if(compareSync(password, rows[0].password)){
                const token = jwt.sign({userId : rows[0].id, role : 'user'},'user123');
                response.status(200).send({token, message : "User Login Successful"})
            }
            else{ //if mismatched then error msg
                response.status(400).send({ message : "Login failed password is invalid"});
            }
        }
    }
    catch(error){ // handles any db error safely
        console.log(error);
        response.status(500).send({ message : "Something went wrong"});
    }
}



// get all or category-based confessions
export async function getConfessions(request, response) {
    try {
        const connection = getConnectionObject();
        const category = request.query.category; // e.g. ?category=first love
        let qry = `
            SELECT u.name, c.title, c.content, c.category
            FROM users u
            INNER JOIN confessions c
            ON u.id = c.id
            WHERE c.status = 'accepted'
        `;

        if (category) {
            qry += ` AND c.category = ?`;
            const [rows] = await connection.query(qry, [category]);
            response.status(200).send(rows);
        } else {
            const [rows] = await connection.query(qry);
            response.status(200).send(rows);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}


// get own confessions
export async function getOwnConfessions(request, response) {
  try {
    const connection = getConnectionObject();
    const userId = request.user.userId; // from JWT payload

    const qry = `SELECT * FROM confessions WHERE id = ${userId}`;
    const [rows] = await connection.query(qry);

    if (rows.length === 0) {
       response.status(404).send({ message: `No confessions found for user ID ${userId}` });
    }
    else{
         response.status(200).send(rows);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

// add confessions 
export async function addConfessions(request, response) {
  try {
    const connection = getConnectionObject();
    const { title, content, category } = request.body;
    const userId = request.user.userId; // Extracted from JWT payload
	
    const qry = `
      INSERT INTO confessions (title, content, id, category)
      VALUES ('${title}', '${content}', ${userId}, '${category}')
    `;

    const [resultSet] = await connection.query(qry);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Confession added successfully" });
    } else {
      response.status(500).send({ message: "Failed to add confession" });
    }
  } catch (error) {
    console.error("addConfessions error:", error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
