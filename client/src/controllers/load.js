import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/load', {});
};

const loadAll = () => {
    return axios.post('/load/all', {});
}

const deleteRow = (rowId) => {
    return axios.delete(`/load/${rowId}`);
}

export default {
    getAll,
    loadAll,
    deleteRow
}