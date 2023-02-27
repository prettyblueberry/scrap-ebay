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


const rows = [
  {
    id: 1,
    number: '123',
    image: 'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "213",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 2,
    number: '23',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'earth',
    watcher: "qwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 3,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'problem',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 4,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 5,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 6,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 7,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 8,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 9,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 10,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 11,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    itle: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 12,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 13,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 14,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },
  {
    id: 15,
    number: '124',
    image:'https://i.ebayimg.com/thumbs/images/g/7usAAOSwxsRj-XUY/s-l96.jpg',
    title: 'World',
    watcher: "qqwe",
    price: 123,
    shippingPrice: 234,
    quantityAvailable: 12,
    quantitySold: 123,
    condition: ""
  },

];

function ItemList() {
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
              <MDBox display="flex">
                <MDBox ml={1}>
                  <MDTypography variant="outlined" color="dark">
                    {/*<Icon>schedule</Icon>*/}
                    &nbsp;Date Saved: 12/3/2022
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDTypography variant="button" color="text">
              Analysis Table Data
            </MDTypography>
          </MDBox>
          <MDBox m={1} ml={2} mr={2}>
            <ItemDataGrid rows={rows}/>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ItemList;
