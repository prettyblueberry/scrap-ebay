import * as React from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import LoadDataGrid from "../load/components/LoadDataGrid";
import {useState} from "react";
import ItemLoadDataGrid from "./components/ItemLoadDataGrid";
import loadController from "../../controllers/load";
import ScheduleTimePicker from "./components/scheduleTimePicker";
import MDSnackbar from "../../components/MDSnackbar";

function LoadManage() {
    const [selectedLoadId, setSelectedLoadId] = useState(false);
    const [updateSignal, setUpdateSignal] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const [infoSB, setInfoSB] = useState(false);
    const openInfoSB = () => setInfoSB(true);
    const closeInfoSB = () => setInfoSB(false);
    const renderInfoSB = (
        <MDSnackbar
            icon="warning"
            title="Please Wait."
            content="It takes several minutes to load all data from eBay."
            dateTime=""
            open={infoSB}
            onClose={closeInfoSB}
            close={closeInfoSB}
        />
    );

    const loadAll = ()=>{
        // setLoadingData(true);
        openInfoSB();
        loadController.loadAll().then(()=>{
            //setUpdateSignal(updateSignal + 1);
        }).finally(()=>{
            setLoadingData(false);
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
                                        Schedule for Loading
                                    </MDTypography>
                                </MDBox>
                                <MDTypography variant="button" color="text">
                                    You can make schedule for loading.
                                </MDTypography>
                            </MDBox>

                            <MDBox p={3} lineHeight={1}>
                                <ScheduleTimePicker />
                            </MDBox>
                        </Card>
                    </MDBox>
                    <MDBox m={2}>
                        <Card>
                            <MDBox p={3} lineHeight={1}>
                                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        Log of Loading
                                    </MDTypography>
                                    <MDBox display="flex">
                                        <MDBox>
                                            <MDButton variant="gradient" color="info" ml={2} onClick={loadAll}>
                                                Load
                                            </MDButton>
                                            {renderInfoSB}
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
                                                <LoadDataGrid setSelectedLoadId={setSelectedLoadId} updateSignal={updateSignal} loadingData={loadingData}
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

export default LoadManage;
