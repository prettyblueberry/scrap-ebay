import axios from "controllers/axios"
import api from "controllers/axios";

const signIn = ( email, pwd ) => {
    return axios.post('auth', {
        email,
        pwd
    }).then((res)=>{
        const user = res.data.user;
        const tokenHeaderKey = res.data.tokenHeaderKey;
        const token = res.data.token;

        localStorage.setItem("auth", JSON.stringify({
            login: true,
            user,
            tokenHeaderKey,
            token
        }));

        setHeader();

        return res;
    });
}

const getAuth = () => {
    const auth = localStorage.getItem("auth");
    if(!auth) return {login: false, user:{}, tokenHeaderKey: null, token: null};
    return JSON.parse(auth);
}

const signOut = () => {
    axios.interceptors.request.use(function (config) {
        const auth = getAuth();
        delete config.headers[auth.tokenHeaderKey];
        return config;
    });

    localStorage.setItem("auth", null);

    return axios.delete('/auth')
}

const setHeader = () => {
    const auth = getAuth();
    axios.interceptors.request.use(function (config) {
        config.headers[auth.tokenHeaderKey] = auth.token;
        return config;
    });
}

setHeader();

export default {
    signIn, signOut, getAuth
}