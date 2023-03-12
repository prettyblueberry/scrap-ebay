import dbCon from "./dbcon.js";
import moment from "moment";

const tblName = "users";
const UserModel = {
    //special
    find: (qb, where, callback) => {
        dbCon(qb).then((qb)=>{
            qb.where(where)
                .from("users")
                .limit(1)
                .get((err, results) => {
                    if(err) throw err;
                    if(results.length > 0) callback(qb, results[0]);
                    else callback(qb, null);
                });
        });
    },

    //common
    getWhere : function (qb, where = {}, callback) {
        dbCon(qb).then((qb)=>{
            if(Object.keys(where).length > 0){
                qb.get_where(tblName, where, (err, res)=>{
                    if(err) {
                        const lastQuery = qb.last_query();
                        console.error(err, lastQuery);
                        return callback(qb, err);
                    }
                    callback(qb, null, res);
                });
                return;
            }
            qb.get(tblName, (err, res)=>{
                if(err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    callback(qb, err);
                }
                callback(qb, null, res);
            });
        })
    },
    findRowById : function (qb, id, callback) {
        dbCon(qb).then((qb)=>{
            qb.limit(1).get_where(tblName, { id }, (err, res)=>{
                if(err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(qb, err);
                }
                if(res.length > 0) callback(qb, null, res[0]);
                else {
                    const lastQuery = qb.last_query();
                    const err = new Error("empty select!");
                    console.error(err, lastQuery)
                    return callback(qb, err);
                }
            })
        })
    },

    inputRow: function (qb, row, callback) {
        if(row.isNew){
            delete row["isNew"];
            delete row["id"];

            return this.insertRow(qb, row, callback);
        }
        delete row["isNew"];
        return this.updateRow(qb, row, callback);
    },
    insertRow : function (qb, row, callback) {
        const findRowById = this.findRowById;
        ///special
        row.dateCreated =  moment(new Date()).format("YYYY-MM-DD");

        dbCon(qb).then((qb)=>{
            qb.insert(tblName, row, function(err, res) {
                if (err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(qb, err);
                }

                if (res.affected_rows > 0) {
                    findRowById(qb, res.insert_id, callback);
                }
                else {
                    const lastQuery = qb.last_query();
                    const err = new Error("empty insert!");
                    console.error(err, lastQuery);
                    return callback(qb, err)
                }
            }.bind(this));
        });
    },
    updateRow : function (qb, row, callback) {
        dbCon(qb).then((qb) => {
            qb.update(tblName, row, {id: row.id}, (err, res)=>{
                if (err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(err);
                }

                if (res.affected_rows > 0) {
                    return this.findRowById(qb, row.id, callback);
                } else {
                    const lastQuery = qb.last_query();
                    const err = new Error("empty update!");
                    console.error(err, lastQuery)
                    return callback(qb, err)
                }
            })
        });
    },

    deleteRow : function (qb, id, callback) {
        this.findRowById(qb, id, (qb, err, oldRow)=>{
            if(err) return callback(qb, err);

            qb.delete(tblName, {id: id}, (err, res)=>{
                if (err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(qb, err);
                }
                callback(qb, null, oldRow);
            })
        });
    }
};
export default UserModel;