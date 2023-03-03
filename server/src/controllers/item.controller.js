import HS from "http-status-codes";
import itemModel from "../models/item.model.js";

//get
const search = (query, req, res) => {
    itemModel.getWhere(query, (qb, err, items)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(items);
    })
}

const latest = (req, res) => {
    itemModel.getLatest({}, (qb, err, items)=>{
        console.log(qb.last_query())
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(items);
    })
}

export default {
    search,
    latest
}