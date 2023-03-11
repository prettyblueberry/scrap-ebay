import jwtHelper from "../helpers/jwt.helper.js";
import HS from "http-status-codes";
export  function authMiddleware(req, res, next){
    console.log("!@#tracker", "authMiddleware");
    if(req.login) return next();
    res.sendStatus(HS.UNAUTHORIZED);
}

export function jwtSession(req, res, next){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);
    if(token){
        const verified = jwtHelper.verifyToken(token);
        if(verified){
            req.login = true;
            req.jsession = { ...verified };
            next();
            return;
        }
    }
    req.login = false;
    req.jsession = {};
    next();
}