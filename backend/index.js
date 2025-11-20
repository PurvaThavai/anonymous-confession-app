import express from 'express';
import { connectDB } from './src/configs/DBconfig.js';
import { registerUser,userLogin ,getConfessions, getOwnConfessions, addConfessions} from './src/controllers/UserController.js';
import { adminLogin, registerAdmin ,getAllConfessions,getAllUsers,updateConfessionStatus,getUserConfessionsById, deleteConfessionById,getPendingConfessions} from './src/controllers/AdminController.js';
import { verifyToken } from './src/middlewares/VerifyToken.js';
import { verifyTokenUser } from './src/middlewares/VerifyTokenUser.js';
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request,response) => {
    response.send({ message : "This is Backend"});
});


//apis
app.post("/users/signup",registerUser);
app.post("/users/login",userLogin);


app.post("/admins",registerAdmin);
app.post("/admins/login",adminLogin);


//admins apis
app.get("/confessions",getAllConfessions);
app.get("/users",getAllUsers);
app.put("/confessions/:id",updateConfessionStatus);
//app.get("/confessions/:id",getUserConfessionsById);
app.delete("/confessions/:id",deleteConfessionById);
app.get("/confessions/pending",getPendingConfessions);

//user apis
app.get("/users/confessions",getConfessions);
app.get("/users/confessions/own",verifyTokenUser,getOwnConfessions);
app.post("/users/confessions/add",verifyTokenUser,addConfessions);

app.listen(4900, () => {
    connectDB();
});