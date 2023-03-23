import HS from "http-status-codes";
import scheduleModel from "../models/schedule.model.js";
import schedule from "node-schedule";
import loadController from "./load.controller.js";
import moment from "moment";

let scheduleJob = null;
const setScheduleJob = () => {
    if(scheduleJob) {
        scheduleJob.cancel();
        console.log("old schedule job has been canceled.")
    }
    scheduleModel.getWhere(null, {}, (qb, err, times)=>{
        qb.disconnect();
        if(times.length > 0 ){
            const time = times[0].time;
            const timeSchedule = moment(new Date(time)).format("ss mm HH")
            const timeStr = moment(new Date(time)).format("HH:mm:ss")
            scheduleJob = schedule.scheduleJob(`${timeSchedule} * * *`, function(){
                console.log("schedule job start:" , timeStr)
                loadController.loadSoldItemsByAllSellers(true,()=>{
                    console.log("schedule job finish")
                });
            });
            console.log("new schedule job has been created:" , timeStr)
        }
    })
};

//get
const search = (query, req, res) => {
    scheduleModel.getWhere(null, query, (qb, err, times)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(times);
    })
}

//patch
const saveOne = (body, req, res) => {
    const time = moment(new Date(body.time)).format("YYYY-MM-DD HH:mm:ss");
    scheduleModel.inputRow(null, {id: 1, time: time}, (qb, err, time)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        setScheduleJob();
        res.json(time);
    })
}



export default {
    search,
    saveOne,
    setScheduleJob
}