import * as React from "react";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../../examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import SellerSelectGrid from "./components/SellerSelectGrid";
import {useEffect, useState} from "react";
import SoldItemGrid from "./components/SoldItemGrid";
import sellerController from "../../../controllers/seller";

function SoldItems() {
    const [loading, setLoading] = useState(false);

    const [sellers, setSellers] = useState([]);
    const [filteredSellers, setFilteredSellers] = useState([]);

    useEffect(()=>{
        setLoading(true);
        sellerController.getAll().then((res)=>{
            setLoading(false);
            setSellers(res.data);
            setFilteredSellers(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item md={4}>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Sellers
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    Select sellers to filter items.
                                </MDTypography>
                            </MDBox>

                            <MDBox>
                                <Grid container>
                                    <Grid item md={12}>
                                        <Grid item md={12}>
                                            <MDBox m={2}>
                                                <SellerSelectGrid rows={sellers} setFilteredRows={setFilteredSellers} loading={loading}/>
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </MDBox>
                </Grid>
                <Grid item md={8}>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Items Sold
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    Items which have numbers of sold
                                </MDTypography>
                            </MDBox>
                            <MDBox>
                                <Grid container>
                                    <Grid item md={12}>
                                        <Grid item md={12}>
                                            <MDBox m={2}>
                                                <SoldItemGrid sellers={filteredSellers}/>
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </MDBox>
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default SoldItems;
