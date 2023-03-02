import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/seller', {});
};
const saveRow = (row) => {
    return axios.patch('/seller', row);
};

const deleteRow = (rowId) => {
    return axios.delete(`/seller/${rowId}`);
}

export default {
    getAll,
    saveRow,
    deleteRow
}