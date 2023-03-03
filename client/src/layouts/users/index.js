import * as React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import UserDataGrid from "./components/UserDataGrid";

function UsersManage() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item md={3} />
                <Grid item md={6}>
                    {/*<Card>*/}
                    <Card>
                        <MDBox p={3} lineHeight={1}>
                            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Users
                                </MDTypography>
                            </MDBox>
                            <MDTypography variant="button" color="text">
                                You can remove users.
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <Grid container>
                                <Grid item md={12}>
                                    <Grid item md={12}>
                                        <MDBox m={2}>
                                            <UserDataGrid />
                                        </MDBox>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Card>
                    {/*</Card>*/}
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default UsersManage;
