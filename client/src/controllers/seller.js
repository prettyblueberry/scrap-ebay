import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/seller', {});
};

const getAnalytics = ()=>{
    return axios.get('/seller/analytics', {});
};

const saveRow = (row) => {
    return axios.patch('/seller', row);
};

const deleteRow = (rowId) => {
    return axios.delete(`/seller/${rowId}`);
}

export default {
    getAll,
    getAnalytics,
    saveRow,
    deleteRow
}