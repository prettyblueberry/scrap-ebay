import HS from "http-status-codes";
import itemModel from "../models/item.model.js";

//get
const search = (query, req, res) => {
    itemModel.getWhere(null, query, (qb, err, items)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(items);
    })
}

const latest = (req, res) => {
    itemModel.getLatest(null, {}, (qb, err, items)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(items);
    })
}

const sold = (req, res) => {
    itemModel.getLatestSold(null, {}, (qb, err, items)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(items);
    })
}

export default {
    search,
    latest,
    sold
}