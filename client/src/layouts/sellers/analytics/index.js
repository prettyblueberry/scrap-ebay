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
import * as React from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Grid from "@mui/material/Grid";


import SellerDataGrid from "layouts/sellers/analytics/components/sellerDataGrid";
import VerticalBarChart from "../../../examples/Charts/BarCharts/VerticalBarChart";
import verticalBarChartData from "../../pages/charts/data/verticalBarChartData";

import SellerDataGridDays from "layouts/sellers/analytics/components/VerticalBarChart/sellerDataGridDays";

const rows = [
  {
    id: 1,
    login: 'as_bb',
    seller: '123',
    description: 'World',
    soldLast30: 213,
    soldLast1: 123,
    soldLast7: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 2,
    login: 'as_xx',
    seller: '263',
    description: 'World',
    soldLast30: 213,
    soldLast1: 123,
    soldLast7: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 3,
    login: 'as_er',
    seller: '25',
    description: 'World',
    soldLast30: 213,
    soldLast1: 123,
    soldLast7: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 4,
    login: 'as_wr',
    seller: '345',
    description: 'World',
    soldLast30: 213,
    soldLast7: 123,
    soldLast1: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 5,
    login: 'as_wr',
    seller: '345',
    description: 'World',
    soldLast30: 213,
    soldLast7: 123,
    soldLast1: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 6,
    login: 'as_wr',
    seller: '345',
    description: 'World',
    soldLast30: 213,
    soldLast7: 123,
    soldLast1: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 7,
    login: 'as_wr',
    seller: '345',
    description: 'World',
    soldLast30: 2312,
    soldLast7: 234,
    soldLast1: 123,
    dataSaved: '3/11/2022'
  },
  {
    id: 8,
    login: 'as_wr',
    seller: '345',
    description: 'World',
    soldLast30: "213",
    soldLast7: 123,
    soldLast1: 123,
    dataSaved: '3/11/2022'
  },
];

function SellerList() {

  const [filteredRows, setFilteredRows] = React.useState(() => rows);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container>
        <Grid item md={6}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
                <MDTypography variant="h5" fontWeight="medium">
                  Sellers
                </MDTypography>
                <MDBox display="flex">
                  <MDBox>
                    <MDButton variant="outlined" color="dark">
                      <Icon>description</Icon>
                      &nbsp;export excel
                    </MDButton>
                    <MDButton variant="gradient" color="info" ml={2}>
                      new seller
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDTypography variant="button" color="text">
                Analysis Table Data
              </MDTypography>
            </MDBox>
            <MDBox>
              <Grid container>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <MDBox m={2}>
                      <SellerDataGrid rows={ rows }
                                      setFilteredRows={setFilteredRows}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={6}>
          <MDBox md={12} m={2}>
            <SellerDataGridDays title={"Sold in 1 day"} description={"adsasdf"} rows={filteredRows} dataKey={"soldLast1"} color={"dark"} icon={{color: "dark", component:"Day"}}/>
          </MDBox>
          <MDBox md={12} m={2}>
            <SellerDataGridDays title={"Sold in 7 day"} description={"adsasdf"} rows={filteredRows} dataKey={"soldLast7"} color={"primary"} icon={{color : "warning", component: "Week"}}/>
          </MDBox>
          <MDBox md={12} m={2}>
            <SellerDataGridDays title={"Sold in 30 day"} description={"adsasdf"} rows={filteredRows} dataKey={"soldLast30"} color={"warning"} icon={{color : "primary", component: "Month"}} />
          </MDBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default SellerList;
