import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/user', {});
};
const saveRow = (row) => {
    return axios.patch('/user', row);
};

const updatePassword = (currentPwd, newPwd) => {
    return axios.patch(`/user/pwd`, {
        currentPwd,
        newPwd
    });

}

const deleteRow = (rowId) => {
    return axios.delete(`/user/${rowId}`);
}

export default {
    getAll,
    saveRow,
    deleteRow,
    updatePassword
}