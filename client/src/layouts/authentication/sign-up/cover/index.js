/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/eBay-Listing-Software-to-Opt-for-in-2022.jpg";
import {useState} from "react";
import authController from "../../../../controllers/auth";
import { useNavigate } from "react-router-dom";
import MDAlert from "../../../../components/MDAlert";

function Cover() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const redirect = "/";
  const [alert, setAlert] = useState({show: false, color: "", message: ""});
  const [isEmailError, setIsEmailError] = useState(false);
  const [isConfirmError, setIsConfirmError] = useState(false);

  const handleSubmit = () => {
    if(pwd !== confirm) {
      setAlert({show: true, color: "error", message: "Password confirm error!"});
      setIsConfirmError(true);
      return;
    }
    authController.signUp({name, email, pwd}).then((res)=>{
      setAlert({ show: true, color: "success", message: "Success!" });
      setTimeout(()=>{
        return navigate(redirect);
      }, 1000);
    }).catch((err)=>{
      if(err.response.data.code === "ER_DUP_ENTRY"){
        setIsEmailError(true);
        setAlert({ show: true, color: "error", message: "Duplicated Email!" });
        return;
      }
      setAlert({ show: true, color: "error", message: "Failed!" });
    });
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Register
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          { alert.show === true ?
                <MDAlert color={alert.color}>
                  <MDTypography variant="body2" color="white">
                    {alert.message}
                  </MDTypography>
                </MDAlert>: "" }

          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth value={name} onChange={(event)=> setName(event.target.value) }/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth value={email} onChange={(event)=> setEmail(event.target.value)} error={isEmailError}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth value={pwd} onChange={(event)=> setPwd(event.target.value) }/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm" variant="standard" fullWidth value={confirm} onChange={(event)=> setConfirm(event.target.value) } error={isConfirmError}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to={redirect}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
