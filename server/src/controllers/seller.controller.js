import HS from "http-status-codes";
import sellerModel from "../models/seller.model.js";
import loadModel from "../models/load.model.js";
import itemModel from "../models/item.model.js";

//get
const search = (query, req, res) => {
    sellerModel.getWhere(query, (qb, err, sellers)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(sellers);
    })
}

//analytics
const analytics = (req, res) => {
    loadModel.getLastDate((qb, err, lastDate)=>{
        qb.release();
        sellerModel.getWhere({},(qb, err, sellers)=>{
            const resData = [];
            if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
            if(sellers.length ===0) res.json(resData);
            let promise = new Promise((resolve)=>{ resolve(qb);});
            for(let i = 0 ; i < sellers.length; i++){
                promise = promise.then((qb)=>{
                    return analyticsSingle(qb, sellers[i], lastDate);
                }).then(({qb, single})=>{
                    resData.push(single);
                    return qb;
                });
            }
            promise.then((qb)=>{
                qb.release();
                res.json(resData);
            });
        })
    });
}

const analyticsSingle = (qb, seller, lastDate) => {
    const mapped = {...seller};
    return itemModel.getSoldPeriod(qb,seller.id,lastDate,1)
        .then(({qb, soldData})=>{
            mapped.soldLast1 = soldData.sold_amount;
            return itemModel.getSoldPeriod(qb,seller.id,lastDate,7)
        })
        .then(({qb, soldData})=>{
            mapped.soldLast7 = soldData.sold_amount;
            return itemModel.getSoldPeriod(qb,seller.id,lastDate,30)
        })
        .then(({qb, soldData}) => {
            mapped.soldLast30 = soldData.sold_amount;
            return {qb, single: mapped};
        })
};


//patch
const saveOne = (body, req, res) => {
    delete body["no"];
    sellerModel.inputRow(body, (qb, err, seller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(seller);
    })
}

//delete
const deleteOne = (id, req, res) => {
    sellerModel.deleteRow(id,(qb, err, oldSeller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldSeller);
    });
}

export default {
    search,
    deleteOne,
    saveOne,
    analytics
}