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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import {useState} from "react";
import userController from "../../../../../../controllers/user";
function ChangePassword() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleUpdatePassword = () => {
    if(newPwd !== confirmPwd) alert("Password confirm error!");
    userController.updatePassword(currentPwd, newPwd);
  }


  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Change Password</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
              value={currentPwd}
              onChange={(evt)=>{
                setCurrentPwd(evt.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
              value={newPwd}
              onChange={(evt)=>{
                setNewPwd(evt.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Confirm New Password"
              inputProps={{ type: "password", autoComplete: "" }}
              value={confirmPwd}
              onChange={(evt)=>{
                setConfirmPwd(evt.target.value)
              }}
            />
          </Grid>
        </Grid>
        <MDBox mt={6} mb={1}>
          <MDTypography variant="h5">Password Guide</MDTypography>
        </MDBox>
        <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small" onClick={handleUpdatePassword}>
              update password
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ChangePassword;
