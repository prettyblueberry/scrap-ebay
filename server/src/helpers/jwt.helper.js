import jwt from "jsonwebtoken";

const generateToken = (data) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign(data, jwtSecretKey);
}

const verifyToken = (token) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const verified = jwt.verify(token, jwtSecretKey);
        console.log("123123", verified);
        if(verified){
            return verified;
        }else{
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
}

export default {
    generateToken,
    verifyToken
}