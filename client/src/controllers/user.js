import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/user', {});
};
const saveRow = (row) => {
    return axios.patch('/user', row);
};

const updatePassword = (currentPwd, newPwd) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const id = auth.user.id;
    return axios.patch(`/user/${id}/pwd`, {
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