import Router from "express";
import authController from "../controllers/auth.controller.js";
import sellerController from "../controllers/seller.controller.js";
const router = Router();

router.post('/auth', (req, res)=>{
    return authController.signIn(req.body, req, res);
});
router.delete('/auth', (req, res)=>{
    return authController.signOut(req, res);
});

routeRestful('/seller', sellerController, router);

export default router;