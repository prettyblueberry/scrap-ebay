import * as React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import Icon from "@mui/material/Icon";
import LoadDataGrid from "../load/components/LoadDataGrid";
import {useState} from "react";
import ItemLoadDataGrid from "./components/ItemLoadDataGrid";
import loadController from "../../controllers/load";

function LoadManage() {
    const [filteredLoads, setFilteredLoads] = useState([]);
    const loadAll = ()=>{
        loadController.loadAll().then(()=>{
            LoadManage.forceUpdate();
        });
    };

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
                                        Loading History
                                    </MDTypography>
                                    <MDBox display="flex">
                                        <MDBox>
                                            <MDButton variant="gradient" color="info" ml={2} onClick={loadAll}>
                                                Load
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
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
                                                <LoadDataGrid setFilteredRows={setFilteredLoads}
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
                                                <ItemLoadDataGrid loads={filteredLoads} />
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

export default LoadManage;
