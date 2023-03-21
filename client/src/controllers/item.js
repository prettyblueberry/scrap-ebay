import axios from "controllers/axios"

const getAll = ()=>{
    return axios.get('/item', {});
};

const getByLoadIds = (loadId)=>{
    return axios.get('/item', {
        params: {
            loadId
        }
    });
};

const getLatest = ()=>{
    return axios.get('/item/latest', {});
};

const getSold = ()=>{
    return axios.get('/item/sold', {});
};

export default {
    getAll,
    getLatest,
    getSold,
    getByLoadIds
}