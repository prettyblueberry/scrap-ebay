import axios from "controllers/axios"
import auth from "controllers/auth"

const getAll = ()=>{
    return axios.get('/user', {});
};

const signUp = (row) => {
    return axios.post('/user', row)
        .then((res)=>{
            auth.saveAuthToLocalStorage(res.data);
            auth.setHeader();
            return res;
        });
};

const saveRow = (row) => {
    return axios.patch('/user', row);
};

const updatePassword = (currentPwd, newPwd) => {
    return axios.patch(`/user/pwd`, {
        currentPwd,
        newPwd,

    });

}

const deleteRow = (rowId) => {
    return axios.delete(`/user/${rowId}`);
}

export default {
    getAll,
    signUp,
    saveRow,
    deleteRow,
    updatePassword
}