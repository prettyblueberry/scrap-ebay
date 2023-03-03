import axios from "controllers/axios"

const signIn = ( email, pwd ) => {
    console.log("signin", email, pwd);
    return axios.post('auth', {
        email,
        pwd
    }).then((res)=>{
        console.log("set localStorage auth_token", res.data.auth_token)
        localStorage.setItem("auth", JSON.stringify(res.data));
        return res;
    });
}

const signOut = () => {
    return axios.delete('auth')
}

export default {
    signIn, signOut
}