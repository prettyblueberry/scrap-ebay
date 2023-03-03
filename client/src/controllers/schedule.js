import axios from "controllers/axios"
import moment from "moment";

const getTime = ()=>{
    return axios.get('/schedule', {}).then((res)=>{
        if(res.data.length > 0) return res.data[0].time;
        return null;
    });
};
const saveTime = (time) => {
    return axios.patch('/schedule', {time: time});
};

const deleteTime = (rowId) => {
    return axios.delete(`/schedule/${rowId}`);
}

export default {
    getTime,
    saveTime,
    deleteTime
}