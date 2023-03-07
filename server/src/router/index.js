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

//save, sign up
router.post('/user', function(req, res){
    return userController.signUp(req.body, req, res);
});

router.use(authMiddleware);

routeRestful('/seller', sellerController, router);
router.get('/seller/analytics', sellerController.analytics);

routeRestful('/load', loadController, router);
router.post('/load/all', (req, res)=>{
    loadController.loadAllSellers(()=>{
        res.sendStatus(HS.OK);
    });
})

routeRestful('/item', itemController, router);
router.get('/item/latest', itemController.latest);

routeRestful('/schedule', scheduleController, router);

//user
//search
router.get('/user', function(req, res){
    return userController.search(req.query, req, res);
});
router.patch('/user', function(req, res){
    return userController.saveOne(req.body, req, res);
});
router.delete("/user/:id", function(req, res){
    return userController.deleteOne(req.params.id, req, res);
});
//update password
router.patch('/user/pwd', (req, res)=>{
    userController.updatePassword(req.body, req, res);
});

export default router;