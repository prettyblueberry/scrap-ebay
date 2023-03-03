import HS from "http-status-codes";
import scheduleModel from "../models/schedule.model.js";

//get
const search = (query, req, res) => {
    scheduleModel.getWhere(query, (qb, err, sellers)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(sellers);
    })
}

//patch
const saveOne = (body, req, res) => {
    scheduleModel.inputRow({id: 1, time: body.time.replace("T", " ")}, (qb, err, seller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(seller);
    })
}

//delete
const deleteOne = (id, req, res) => {
    scheduleModel.deleteRow(id,(qb, err, oldSeller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldSeller);
    });
}

export default {
    search,
    deleteOne,
    saveOne
}