import HS from "http-status-codes";
import scheduleModel from "../models/schedule.model.js";
import schedule from "node-schedule";
import loadController from "./load.controller.js";

let scheduleJob = null;
const setScheduleJob = () => {
    if(scheduleJob) {
        scheduleJob.cancel();
        console.log("old schedule job has been canceled.")
    }
    scheduleModel.getWhere({}, (qb, err, times)=>{
        qb.release();
        if(times.length > 0 ){
            const time = times[0].time.toISOString();
            const h = time.substring(11,13);
            const m = time.substring(14, 16);
            const s = time.substring(17, 19);
            scheduleJob = schedule.scheduleJob(`${s} ${m} ${h} * * *`, function(){
                console.log("schedule job start:" , `${h}:${m}:${s}`)
                loadController.loadAllSellers(()=>{
                    console.log("schedule job finish")
                });
            });
            console.log("new schedule job has been created:" , `${h}:${m}:${s}`)
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
    scheduleModel.inputRow({id: 1, time: body.time}, (qb, err, time)=>{
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