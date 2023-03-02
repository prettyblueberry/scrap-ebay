import Router from "express";
import authController from "../controllers/auth.controller.js";
const router = Router();

router.post('/auth', (req, res)=>{
    return authController.signIn(req.body, req, res);
});
router.delete('/auth', (req, res)=>{
    return authController.signOut(req, res);
});

export default router;