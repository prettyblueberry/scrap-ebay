import HS from "http-status-codes";
import sellerModel from "../models/seller.model.js";

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
    sellerModel.getWhere({},(qb, err, sellers)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        const analytics = sellers.map((s) => {
            return {...s}
        });
        res.json(analytics);
    })
}

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