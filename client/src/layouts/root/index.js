import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import authController from "../../controllers/auth"
export default function Root(){
    const navigate = useNavigate();

    useEffect(()=>{
        if(authController.isLogin())
            navigate("/analytics")
        else navigate("/sign-in")
    }, []);
    return (
        <>
        </>
    );
}