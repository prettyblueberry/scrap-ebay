import jwtHelper from "../helpers/jwt.helper.js";
import HS from "http-status-codes";
export  function authMiddleware(req, res, next){
    console.log("!@#tracker", "authMiddleware", req.login, req.jsession, req.originalUrl, req.method);
    if(req.login) return next();
    res.sendStatus(HS.UNAUTHORIZED);
}

export function jwtSession(req, res, next){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);
    console.log("!@#tracker", "get token", tokenHeaderKey, token, req.originalUrl, req.method);
    if(token){
        const verified = jwtHelper.verifyToken(token);
        console.log("!@#tracker", "token verified", verified, req.originalUrl, req.method);
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