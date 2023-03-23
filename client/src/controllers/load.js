import axios from "controllers/axios"

const getAll = (query)=>{
    return axios.get('/load', {
        params: query
    });
};

const loadAll = () => {
    return axios.post('/load/all', {
    });
}

const loadStore = (loginId) => {
    return axios.post('/load/store', {
        loginId
    });
}

const deleteRow = (rowId) => {
    return axios.delete(`/load/${rowId}`);
}

export default {
    getAll,
    loadAll,
    deleteRow,
    loadStore
}