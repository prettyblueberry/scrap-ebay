import axios from "controllers/axios"

const signIn = ( email, pwd ) => {
    localStorage.setItem("auth", "");

    return axios.post('auth', {
        email,
        pwd
    }).then((res)=>{
        saveAuthToLocalStorage(res.data);
        setHeader();
        return res;
    });
}

const signUp = (row) => {
    return axios.put('/auth', row)
        .then((res)=>{
            saveAuthToLocalStorage(res.data);
            setHeader();
            return res;
        });
};

const getAuth = () => {
    const auth = localStorage.getItem("auth");
    if((!auth) || auth === "" || auth === "null" || auth === "NULL" || auth === "false")
        return { login: false, user:{name: ""}, tokenHeaderKey: null, token: null };
    return JSON.parse(auth);
}

const signOut = () => {
    axios.delete('/auth');

    localStorage.setItem("auth", "");
    setHeader();
    // return axios.delete('/auth')
}

const saveAuthToLocalStorage = (auth) => {
    const user = auth.user;
    const tokenHeaderKey = auth.tokenHeaderKey;
    const token = auth.token;

    localStorage.setItem("auth", JSON.stringify({
        login: true,
        user,
        tokenHeaderKey,
        token
    }));
};

const setHeader = () => {
    const auth = getAuth();
    axios.interceptors.request.use(function (config) {
        config.headers[auth.tokenHeaderKey] = auth.token;
        return config;
    });
}

const isLogin = () => {
    const auth = getAuth();
    return auth.login;
}

setHeader();

export default {
    signIn, signUp, signOut,
    getAuth, isLogin, setHeader, saveAuthToLocalStorage
}