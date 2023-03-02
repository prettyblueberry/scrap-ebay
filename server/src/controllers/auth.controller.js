import userModel from "../models/user.model.js";

const verify = (email, reqPwd, dbPwd) =>{
    return reqPwd === dbPwd;
}

const signIn = ({email, pwd}, req, res) => {
        userModel.findByEmail(email, (user)=>{
            if(!user) res.status(401).json({reason: "email"});
            const v = verify(email, pwd, user.pwd)
            if(v) res.status(200).json({token: "12312123"});
            else res.status(401).json({reason: "pwd"})
        })
    };

const signOut = (req, res) => {

}


export default {
    signIn,
    signOut
}