import dbCon from "./dbcon.js";
import moment from 'moment';
import loadModel from "./load.model.js";
const tblName = "items";

const ItemsModel = {
    //loads
//custom
    getSoldPeriod: function(qb, sellerId, lastDate, periodDays ){
        const beforeDate = moment(lastDate).add(0 - periodDays, 'day').format('YYYY-MM-DD');
        let lastSoldData, beforeSoldData;
        return dbCon(qb)
            .then((qb) => {
                return loadModel.getRecentRowFrom(qb, sellerId, lastDate)
            })
            .then(({qb, rows})=>{
                if(rows.length === 0) return {qb, soldData: {sum_sold_amount: 0, sum_sold: 0 }}
                const lastLoadRow = rows[0];
                const loadId = lastLoadRow.id;
                return this.getSoldPriceCostByLoadId(qb, loadId);
            })
            .then(({qb, soldData})=>{
                lastSoldData = soldData;
                return loadModel.getRecentRowFrom(qb, sellerId, beforeDate)
            })
            .then(({qb, rows})=>{
                if(rows.length === 0) return {qb, soldData: {sum_sold_amount: 0, sum_sold: 0 }}
                const beforeLoadRow = rows[0];
                const loadId = beforeLoadRow.id;
                return this.getSoldPriceCostByLoadId(qb, loadId);
            })
            .then(({qb, soldData})=>{
                beforeSoldData = soldData;
                const diff = {
                    sold: lastSoldData.sum_sold * 1 - beforeSoldData.sum_sold * 1,
                    sold_amount: lastSoldData.sum_sold_amount * 1 - beforeSoldData.sum_sold_amount * 1
                };
                return {qb, soldData: diff};
            });
    },
    getSoldPriceCostByLoadId: function(qb, loadId){
        return new Promise((resolve, reject)=>{
            dbCon(qb).then((qb)=>{
                qb.select_sum('sold', 'sum_sold')
                    .select_sum('sold * price', 'sum_sold_amount').group_by('loadId')
                    .where({ loadId: loadId })
                    .get(tblName, (err, res) => {
                    if(err) {
                        console.error(err);
                        return reject(err);
                    }
                    if(res.length > 0) return resolve({qb, soldData: res[0]});
                    return resolve({qb, soldData: {sum_sold: 0, sum_sold_amount: 0}});
                });
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
    getLatest : function (qb, where = {}, callback) {
        dbCon(qb).then((qb)=>{
            if(Object.keys(where).length > 0){
                qb.order_by("datetimeCreated", "DESC")
                    .group_by(["itemNumber", "seller"])
                    .get_where(tblName, where, (err, res)=>{
                    if(err) {
                        const lastQuery = qb.last_query();
                        console.error(err, lastQuery);
                        return callback(qb, err);
                    }
                    callback(qb, null, res);
                });
                return;
            }
            qb.order_by("datetimeCreated", "DESC")
                .group_by(["itemNumber", "seller"])
                .get(tblName, (err, res)=>{
                if(err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    callback(qb, err);
                }
                callback(qb, null, res);
            });
        })
    },
    getLatestSold : function (qb, where = {}, callback) {
        dbCon(qb).then((qb)=>{
            if(Object.keys(where).length > 0){
                qb.order_by("datetimeCreated", "DESC")
                    .group_by(["itemNumber", "seller"])
                    .where("`sold` > 0")
                    .get_where(tblName, where, (err, res)=>{
                    if(err) {
                        const lastQuery = qb.last_query();
                        console.error(err, lastQuery);
                        return callback(qb, err);
                    }
                    callback(qb, null, res);
                });
                return;
            }
            qb.order_by("datetimeCreated", "DESC")
                .group_by(["itemNumber", "seller"])
                .where("`sold` > 0")
                .get(tblName, (err, res)=>{
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
        row.datetimeCreated =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

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

            qb.delete(tblName, {id: id}, (err)=>{
                if (err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(qb, err);
                }
                callback(qb, null, oldRow);
            })
        });
    },

    insertBatch: function(qb, rawRows, callback){
        //undefined -> null
        const rows = rawRows.map((r) => {
            const keys = Object.keys(r);
            keys.forEach((k)=>{
                if(r[k] === undefined) r[k] = null;
            })
            return r;
        });

        dbCon(qb).then((qb)=>{
            qb.insert_batch(tblName, rows, function(err, res) {
                if(err) {
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                    return callback(qb, err);
                }

                // INSERT INTO `db_engines` (`name`, `version`)
                // VALUES ('MySQL', '5.5.40'), ('Mongo', '2.6.7'), ('Postgres', '8.4');
                callback(qb, null, res)
            });
        });
    }
};

export default ItemsModel;


