import HS from "http-status-codes";
import userModel from "../models/user.model.js";
import jwtHelper from "../helpers/jwt.helper.js";

const verify = (email, reqPwd, dbPwd) =>{
    return reqPwd === dbPwd;
}

const signIn = ({email, pwd}, req, res) => {
    verifyUser({ email }, pwd, ({status, data}) => {
        if(status === HS.OK){
            const auth = makeAuthResponse(data);
            return res.json(auth);
        }
        res.status(status).json(data);
    });
};

const verifyUser = (where, pwd, callback) => {
    userModel.find(where, (user)=>{
        if(!user) {
            return callback({
                status: HS.UNAUTHORIZED,
                data: { reason: "email" }
            })
        }
        const v = verify(where, pwd, user.pwd)
        if(v) {
            return callback({
                status: HS.OK,
                data: user
            });
        }
        else {
            return callback({
                status: HS.UNAUTHORIZED,
                data: { reason: "pwd" }
            });
        }
    })
};

const makeAuthResponse = (userdata)=>{
    const token = jwtHelper.generateToken(JSON.stringify(userdata));
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    return { token: token, user: userdata, tokenHeaderKey};
}



const signOut = (req, res) => {
    res.sendStatus(HS.OK);
}


export default {
    signIn,
    signOut,
    verifyUser,
    makeAuthResponse
}