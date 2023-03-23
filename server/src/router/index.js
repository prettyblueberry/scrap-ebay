import Router from "express";
import authController from "../controllers/auth.controller.js";
import sellerController from "../controllers/seller.controller.js";
import loadController from "../controllers/load.controller.js";
import itemController from "../controllers/item.controller.js";
import scheduleController from "../controllers/schedule.controller.js";
import userController from "../controllers/user.controller.js";
import HS from "http-status-codes";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/auth', (req, res)=>{
    return authController.signIn(req.body, req, res);
});
router.delete('/auth', (req, res)=>{
    return authController.signOut(req, res);
});
router.put('/auth', function(req, res){
    return authController.signUp(req.body, req, res);
});

router.use(authMiddleware);

routeRestful('/seller', sellerController, router);
router.get('/seller/analytics', sellerController.analytics);

routeRestful('/load', loadController, router);
router.post('/load/sold-all', (req, res)=>{
    res.sendStatus(HS.OK);
    loadController.loadSoldItemsByAllSellers(false,()=>{
    });
})

router.post('/load/store', (req, res)=>{
    res.sendStatus(HS.OK);
    loadController.loadStoreBySeller(null,  req.body.loginId, false,()=>{
    });
})

routeRestful('/item', itemController, router);
router.get('/item/latest', itemController.latest);
router.get('/item/sold', itemController.sold);

routeRestful('/schedule', scheduleController, router);

routeRestful('/user', userController, router);
//update password
router.patch('/user/pwd', (req, res)=>{
    userController.updatePassword(req.body, req, res);
});

export default router;