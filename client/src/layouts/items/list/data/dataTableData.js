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

/* eslint-disable react/prop-types */
// ProductsList page components
import IdCell from "layouts/sellers/list/components/IdCell";
import DefaultCell from "layouts/sellers/list/components/DefaultCell";
import CustomerCell from "layouts/sellers/list/components/CustomerCell";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
const dataTableData = {
  columns: [
    { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "number",
      accessor: "number",
      Cell: ({ value }) => <DefaultCell value={value} />
    }, {
      Header: "title",
      accessor: "title",
      Cell: ({ value }) => <DefaultCell value={value} />
    },{
      Header: "watcher",
      accessor: "watcher",
      Cell: ({value:{name, image}}) => (
          <CustomerCell image={image} color={"primary"} name={name} />
      ),
    },
    {
      Header: "price",
      accessor: "price",
      Cell: ({ value }) => <DefaultCell value={value} />
    },
    {
      Header: "shipping price",
      accessor: "shippingPrice",
      Cell: ({ value }) => <DefaultCell value={value} />
    }, {
      Header: "quantity available",
      accessor: "quantityAvailable",
      Cell: ({ value }) => <DefaultCell value={value} />
    },{
      Header: "solid quantity",
      accessor: "quantitySold",
      Cell: ({ value }) => <DefaultCell value={value} />
    },
    {
      Header: "condition",
      accessor: "condition",
      Cell: ({ value }) => <DefaultCell value={value} />
    }
  ],

  rows: [
    {
      id: "#10421",
      number: "123",
      product: { name: 'aaa', image:team1},
      seller: { name: 'aaa', image:team1},
      title: "ABD",
      watcher: "Abacas",
      price: "$123"
    },
    {
      id: "#10422",
      product: { name: 'bbb', image:team2},
      seller: { name: 'bbb', image:team2},
      sold30: "$ 234",
      sold7: "$ 234"
    },
    {
      id: "#10423",
      product: { name: 'ccc', image:team3},
      seller: { name: 'ccc', image:team3},
      sold30: "$ 345",
      sold7: "$ 345"
    },
    {
      id: "#10423",
      product: { name: 'ccc'},
      seller: { name: 'ccc'},
      sold30: "$ 345",
      sold7: "$ 345"
    },
  ],
};

export default dataTableData;
