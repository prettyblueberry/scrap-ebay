import * as React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import LoadDataGrid from "../load/components/LoadDataGrid";
import {useState} from "react";
import ItemLoadDataGrid from "../load/components/ItemLoadDataGrid";
import SellerSelectGrid from "./components/sellerSelectGrid";


function LoadStore() {
    const [selectedLoadId, setSelectedLoadId] = useState(false);
    const [updateSignal, setUpdateSignal] = useState(0);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container>
                <Grid item md={5}>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Manual Loading all items of store by Sellers
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    Please click download button of a seller.
                                </MDTypography>
                            </MDBox>

                            <MDBox p={3} lineHeight={1}>
                                <SellerSelectGrid />
                            </MDBox>
                        </Card>
                    </MDBox>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Log of Loading all items of store
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    You can check row to show items in detail.
                                </MDTypography>
                            </MDBox>

                            <MDBox>
                                <Grid container>
                                    <Grid item md={12}>
                                        <Grid item md={12}>
                                            <MDBox m={2}>
                                                <LoadDataGrid
                                                    dataQuery={{loadType: "ItemsAllBySeller"}}
                                                    setSelectedLoadId={setSelectedLoadId}
                                                    updateSignal={updateSignal}
                                                />
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </MDBox>
                </Grid>
                <Grid item md={7}>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Saved Items
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    Items of checked loading.
                                </MDTypography>
                            </MDBox>
                            <MDBox>
                                <Grid container>
                                    <Grid item md={12}>
                                        <Grid item md={12}>
                                            <MDBox m={2}>
                                                <ItemLoadDataGrid loadId={selectedLoadId} updateSignal={updateSignal}/>
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

export default LoadStore;
