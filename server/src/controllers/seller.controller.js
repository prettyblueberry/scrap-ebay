import HS from "http-status-codes";
import sellerModel from "../models/seller.model.js";
import loadModel from "../models/load.model.js";
import itemModel from "../models/item.model.js";

//get
const search = (query, req, res) => {
    sellerModel.getWhere(null, query, (qb, err, sellers)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(sellers);
    })
}

//analytics
const analytics = (req, res) => {
    loadModel.getLastDate(null, (qb, err, lastDate)=>{
        sellerModel.getWhere(qb,{},(qb, err, sellers)=>{
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
                qb.disconnect();
                res.json(resData);
            });
        })
    });
}

const analyticsSingle = (qb, seller, lastDate) => {
    const mapped = {...seller};
    return itemModel.getSoldPeriod(qb, seller.id,lastDate,1)
        .then(({qb, soldData})=>{
            mapped.soldLast1 = soldData.sold_amount;
            return itemModel.getSoldPeriod(qb, seller.id,lastDate,7)
        })
        .then(({qb, soldData})=>{
            mapped.soldLast7 = soldData.sold_amount;
            return itemModel.getSoldPeriod(qb, seller.id,lastDate,30)
        })
        .then(({qb, soldData}) => {
            mapped.soldLast30 = soldData.sold_amount;
            return {qb, single: mapped};
        })
};


//patch
const saveOne = (body, req, res) => {
    delete body["no"];
    sellerModel.inputRow(null, body, (qb, err, seller)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(seller);
    })
}

//delete
const deleteOne = (id, req, res) => {
    sellerModel.deleteRow(null,(qb, err, oldSeller)=>{
        qb.disconnect();
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