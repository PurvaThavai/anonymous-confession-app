import jwt from "jsonwebtoken"; // library create and verify JWT token. this middleware will verify token that were created during login
//thi is middleware function for express👇. means it run before actual route handler. checks if valid token exist before letting the user continue
export function verifyTokenUser(request,response,next){//client request, server will send back, pass control to next function if everything is valid
    const authHeader = request.get("Authorization"); // read authorization header from the request. when frontend send request, it usulayy inclides authorization Bearer<toke>
    if(authHeader){ //check if header is present if not means user didnt send token -> unauthorised access
        const token = authHeader.split(" ")[1]; // header value looks like  Bearer abc.efg.hif || split into index || it will extract only token part
        jwt.verify(token,"user123", (error,payload) => { // verify token using same secret key that used while creating || jwt.verify : check if token is not expired , has not tammpered , it should match secret key
            if(error){ //verification mail error msg
                response.status(401).send({ messsage : "Token is invalid"});
            }
            else{ // if pass then 
                console.log(payload); // decode data inside token {userId : 3, role: "user"}
                request.user = payload; // store in this so middleware / routercan access
                //request.loggedInAdminId = payload.adminId;
                next(); // passcontrol to next function
            }
        });
    }
    else{
        response.status(401).send({ messsage : "Token is mssing"});
    }
}