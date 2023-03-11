import jwtHelper from "../helpers/jwt.helper.js";
import HS from "http-status-codes";
export  function authMiddleware(req, res, next){
    console.log("!@#tracker", "authMiddleware", req.login, req.jsession);
    if(req.login) return next();
    res.sendStatus(HS.UNAUTHORIZED);
}

export function jwtSession(req, res, next){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);
    console.log("!@#tracker", "token", tokenHeaderKey, token);
    if(token){
        const verified = jwtHelper.verifyToken(token);
        console.log("!@#tracker", "token verified", verified);
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