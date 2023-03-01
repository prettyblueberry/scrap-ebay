import * as React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";

function LoadManage() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>

            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default LoadManage;
