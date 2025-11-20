import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DBconfig.js";
import jwt from 'jsonwebtoken';


// register admin
export async function registerAdmin(request,response) {
    try{
        const connection = getConnectionObject();
        const {name,phone,email,password} = request.body;
        const encryptedPassword = hashSync(password,12);
        const qry = `INSERT INTO admins(name,phone,email,password) VALUES('${name}','${phone}','${email}','${encryptedPassword}')`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({ message : "Admin Registered"});
        }else{
            response.status(500).send({ message : "Admin Registration Failed"});
        }
    }
    catch(error){
        console.log(error);
        if(error.errno === 1062){
            response.status(400).send({ message : "Admin with this id already exists"});
        }else{
            response.status(500).send({ message : "Something went wrong"});
        }
    }
}

//admin login
export async function adminLogin(request,response){
    try{
        const connection = getConnectionObject();
        const {phone,password} = request.body;
        const qry = `SELECT * FROM admins WHERE phone ='${phone}'`;
        const [rows] = await connection.query(qry);
        if(rows.length === 0){
            response.status(400).send({ message : "Login failed, phone doesn't exist"});
        }else{
            if(compareSync(password, rows[0].password)){
                const token = jwt.sign({adminId : rows[0].id, role : "admin"},"admin123");
                response.status(200).send({token, message : "Login Successful"})
            }
            else{
                response.status(400).send({ message : "Login failed password is invalid"});
            }
        }
    }
    catch(error){
        console.log(error);
        response.status(500).send({ message : "Something went wrong"});
    }
}

// get info of all confessions
export async function getAllConfessions(request, response){
    try {
        //console.log("admin-id in controller", request.loggedInAdminId);
        const connection = getConnectionObject();
        const qry = `SELECT * FROM confessions`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getPendingConfessions(request, response){
    try {
        //console.log("admin-id in controller", request.loggedInAdminId);
        const connection = getConnectionObject();
        const qry = `SELECT * FROM confessions where status = "pending"`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}


// Gets the information of the users table

export async function getAllUsers(request, response){
    try {
        //console.log("admin-id in controller", request.loggedInAdminId);
        const connection = getConnectionObject();
        const qry = `SELECT id, name,email,phone FROM users`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

// update the status of the confessions
// export async function updateConfessionStatus(request, response) {
//     try {
//         const connection = getConnectionObject();
//         const { confession_id, status } = request.body;  // data from frontend

//         const qry = `UPDATE confessions SET status = ? WHERE confession_id = ?`;
//         const [resultSet] = await connection.query(qry, [status, confession_id]);

//         if (resultSet.affectedRows === 1) {
//             response.status(200).send({ message: 'Confession status updated successfully' });
//         } else {
//             response.status(404).send({ message: 'Confession not found or already updated' });
//         }
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: 'Something went wrong' });
//     }
// }

export async function updateConfessionStatus(request, response) {
  try {
    const connection = getConnectionObject();
    const { id } = request.params;
    const { status } = request.body;

    const qry = `UPDATE confessions SET status = ? WHERE confession_id = ?`;
    const [resultSet] = await connection.query(qry, [status, id]);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Confession status updated successfully" });
    } else {
      response.status(404).send({ message: "Confession not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function getUserConfessionsById(request, response) {
  try {
    const connection = getConnectionObject();

    // ✅ Safe and correct query using backticks for template literal
    const qry = `SELECT * FROM confessions WHERE id = ?`;

    // ✅ Pass parameter safely (prevents SQL injection & syntax errors)
    const [rows] = await connection.query(qry, [request.params.id]);

    if (rows.length === 0) {
      response.status(404).send({
        message: `No confessions found with id: ${request.params.id}`,
      });
    } else {
      response.status(200).send(rows);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


//get confessions based on category 
export async function getConfessionsBasedOnCategory(request,response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM confessions WHERE category='${request.params.category}'`;
        const [rows] = await connection.query(qry);
        if (rows.length === 0) {
            response.status(404).send({
                message: `No confessions found with category: ${request.params.category}`
            });
        } else {
            response.status(200).send(rows);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}

// delete confession by id
export async function deleteConfessionById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM confessions WHERE confession_id = ${request.params.id}`;
        const [result] = await connection.query(qry);

        if (result.affectedRows === 0) {
            response.status(404).send({
                message: `No confession found with id: ${request.params.id}`
            });
        } else {
            response.status(200).send({
                message: `Confession with id ${request.params.id} deleted successfully`
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}
