import HS from "http-status-codes";
import userModel from "../models/user.model.js";

const verify = (email, reqPwd, dbPwd) =>{
    return reqPwd === dbPwd;
}

const signIn = ({email, pwd}, req, res) => {
    verifyUser({ email }, pwd, ({status, data})=>{
        if(status === HS.OK) {
            return res.json({auth_token: "123123", user: data})
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

const signOut = (req, res) => {

}


export default {
    signIn,
    signOut,
    verifyUser
}