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
    scheduleModel.getWhere({}, (qb, err, times)=>{
        qb.release();
        if(times.length > 0 ){
            const time = times[0].time;
            const timeSchedule = moment(new Date(time)).format("ss mm HH")
            const timeStr = moment(new Date(time)).format("HH:mm:ss")
            scheduleJob = schedule.scheduleJob(`${timeSchedule} * * *`, function(){
                console.log("schedule job start:" , timeStr)
                loadController.loadAllSellers(()=>{
                    console.log("schedule job finish")
                });
            });
            console.log("new schedule job has been created:" , timeStr)
        }
    })
};

//get
const search = (query, req, res) => {
    scheduleModel.getWhere(query, (qb, err, times)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(times);
    })
}

//patch
const saveOne = (body, req, res) => {
    const time = new Date(body.time).toISOString();
    scheduleModel.inputRow({id: 1, time: time}, (qb, err, time)=>{
        qb.release();
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