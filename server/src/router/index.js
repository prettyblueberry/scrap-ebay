import Router from "express";

const router = Router();
router.get('/test', (req, res, next)=>{
    res.json({
        status: 'success'
    });
    next();
})
export default router;