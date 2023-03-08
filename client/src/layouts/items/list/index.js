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

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ItemDataGrid from "layouts/items/list/components/itemDataGrid";
import {useEffect, useState} from "react";
import itemController from "../../../controllers/item";

function ItemList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    itemController.getLatest().then((res)=>{
      setLoading(false);
      setRows(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={0}>
              <MDTypography variant="h5" fontWeight="medium">
                Items
              </MDTypography>
            </MDBox>
            <MDTypography variant="button" color="text">
              The latest status of items.
            </MDTypography>
          </MDBox>
          <MDBox m={1} ml={2} mr={2}>
            <ItemDataGrid rows={rows} loading={loading}/>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ItemList;
