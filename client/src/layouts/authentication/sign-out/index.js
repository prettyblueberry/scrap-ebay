import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import authController from "../../../controllers/auth"
export default function SignOut(){
    const navigate = useNavigate();

    useEffect(()=>{
        authController.signOut();
        navigate("/authentication/sign-in/basic")
    }, []);
    return (
        <>
        </>
    );
}