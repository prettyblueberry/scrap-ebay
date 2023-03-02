import dbCon from "./dbcon.js";

const findByEmail = (email, callback) => {
    dbCon().then((qb)=>{
        qb.where("email", email)
            .from("users")
            .limit(1)
            .get((err, results) => {
                if(err) throw err;
                if(results.length > 0) callback(results[0]);
                else callback(null);
        });
    });
}

export default {
    findByEmail
}