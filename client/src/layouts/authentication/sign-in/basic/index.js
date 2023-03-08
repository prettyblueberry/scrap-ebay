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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//custom
import {useNavigate} from "react-router-dom";
import authController from "controllers/auth";
import MDAlert from "../../../../components/MDAlert";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const [unauthorized, setUnauthorized] = useState({status: false, reason: ""});

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSignInButton = () => {
    authController.signIn(email, pwd).then((res) => {
      navigate('/analytics');
    }).catch((err)=>{
      setUnauthorized({status: true, reason: err.response.data.reason});
    });
  };
  const keyPress = (e) => {
    if(e.keyCode === 13){
      handleSignInButton();
    }
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          aaa@gmail.com, aaa
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {
            unauthorized.status === true ?
              <MDAlert color="primary">
                <MDTypography variant="body2" color="white">
                  {
                    unauthorized.reason === "email" ? "Unregistered email address." : "Password is incorrect."
                  }
                </MDTypography>
              </MDAlert> : ''
          }

          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={(evt)=>{setEmail(evt.target.value)}} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={pwd} onChange={(evt)=>{setPwd(evt.target.value)}} onKeyDown={keyPress} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignInButton}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
