import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/item', {});
};

const getLatest = ()=>{
    return axios.get('/item/latest', {});
};

export default {
    getAll,
    getLatest
}