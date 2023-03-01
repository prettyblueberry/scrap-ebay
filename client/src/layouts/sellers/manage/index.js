import * as React from "react";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../../examples/Footer";

import SellerManageGrid from "./components/sellerManageGrid";

function SellersManage() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item md={2} />
                <Grid item md={8}>
                    {/*<Card>*/}

                    {/*</Card>*/}
                    {/*<SellerManageGrid />*/}
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default SellersManage;
