import * as React from "react";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../../examples/Footer";

import SellerManageGrid from "./components/sellerManageGrid";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";


function SellersManage() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item md={2} />
                <Grid item md={8}>
                    {/*<Card>*/}
                    <Card>
                        <MDBox p={3} lineHeight={1}>
                            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Sellers
                                </MDTypography>
                                {/*<MDBox display="flex">*/}
                                {/*    <MDBox>*/}
                                {/*        <MDButton variant="outlined" color="dark">*/}
                                {/*            <Icon>description</Icon>*/}
                                {/*            &nbsp;export excel*/}
                                {/*        </MDButton>*/}
                                {/*        <MDButton variant="gradient" color="info" ml={2}>*/}
                                {/*            new seller*/}
                                {/*        </MDButton>*/}
                                {/*    </MDBox>*/}
                                {/*</MDBox>*/}
                            </MDBox>
                            <MDTypography variant="button" color="text">
                                Manage Sellers
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <Grid container>
                                <Grid item md={12}>
                                    <Grid item md={12}>
                                        <MDBox m={2}>
                                            <SellerManageGrid />
                                        </MDBox>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Card>
                    {/*</Card>*/}
                    {/*<SellerManageGrid />*/}
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default SellersManage;
