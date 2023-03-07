import HS from "http-status-codes";
import userModel from "../models/user.model.js";
import authController from "./auth.controller.js";

//get
const search = (query, req, res) => {
    userModel.getWhere(query, (qb, err, users)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(users);
    })
}

const signUp = (body, req, res)=>{
    userModel.inputRow({ ...body, isNew: true }, (qb, err, user)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        const auth = authController.makeAuthResponse(user);
        res.json(auth);
    })
}

//patch
const saveOne = (body, req, res) => {
    delete body["no"];
    userModel.inputRow(body, (qb, err, user)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(user);
    })
}

//delete
const deleteOne = (id, req, res) => {
    userModel.deleteRow(id,(qb, err, oldUser)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldUser);
    });
}

const updatePassword = (body, req, res) => {
    authController.verifyUser({ id: req.jsession.id }, body.currentPwd, ({status, data})=>{
        if(status !== HS.OK) res.status(status).json(data);

        userModel.updateRow({id: req.jsession.id, pwd: body.newPwd}, (qb, err, user)=>{
            qb.release();
            if(err) {
                const lastQuery = qb.last_query();
                console.error(err, lastQuery);
                return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
            }
            res.sendStatus(HS.OK);
        })
    })
}

export default {
    search,
    signUp,
    deleteOne,
    saveOne,
    updatePassword
}