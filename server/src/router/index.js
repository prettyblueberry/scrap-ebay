import Router from "express";
import authController from "../controllers/auth.controller.js";
import sellerController from "../controllers/seller.controller.js";
import loadController from "../controllers/load.controller.js";
import itemController from "../controllers/item.controller.js";
import scheduleController from "../controllers/schedule.controller.js";
import HS from "http-status-codes";

const router = Router();

router.post('/auth', (req, res)=>{
    return authController.signIn(req.body, req, res);
});
router.delete('/auth', (req, res)=>{
    return authController.signOut(req, res);
});

routeRestful('/seller', sellerController, router);

routeRestful('/load', loadController, router);
router.post('/load/all', (req, res)=>{
    loadController.loadAllSellers(()=>{
        res.sendStatus(HS.OK);
    });
})

routeRestful('/item', itemController, router);
router.get('/item/latest', itemController.latest);

routeRestful('/schedule', scheduleController, router);

export default router;