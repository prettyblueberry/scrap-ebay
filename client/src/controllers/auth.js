import axios from "controllers/axios"

const signIn = ( email, pwd ) => {
    console.log(email, pwd);
    return axios.post('auth', {
        email,
        pwd
    })
}

const signOut = () => {
    return axios.delete('auth')
}

export default {
    signIn, signOut
}