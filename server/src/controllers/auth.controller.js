import HS from "http-status-codes";
import userModel from "../models/user.model.js";

const verify = (email, reqPwd, dbPwd) =>{
    return reqPwd === dbPwd;
}

const signIn = ({email, pwd}, req, res) => {
        userModel.findByEmail(email, (user)=>{
            if(!user) res.status(HS.UNAUTHORIZED).json({reason: "email"});
            const v = verify(email, pwd, user.pwd)
            if(v) res.status(HS.OK).json({ auth_token: "12312123" });
            else res.status(HS.UNAUTHORIZED).json({ reason: "pwd" })
        })
    };

const signOut = (req, res) => {

}


export default {
    signIn,
    signOut
}