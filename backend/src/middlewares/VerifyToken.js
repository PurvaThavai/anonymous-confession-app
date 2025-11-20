import jwt from "jsonwebtoken";

export function verifyToken(request,response,next){
    const authHeader = request.get("Authorization");
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,"admin123", (error,payload) => {
            if(error){
                response.status(401).send({ messsage : "Token is invalid"});
            }
            else{
                console.log(payload);
                request.loggedInAdminId = payload.adminId;
                next();
            }
        });
    }
    else{
        response.status(401).send({ messsage : "Token is mssing"});
    }
}