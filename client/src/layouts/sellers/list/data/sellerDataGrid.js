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

const sellerDataGrid = {
  columns: [
    { Header: "seller id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "seller",
      accessor: "seller",
      Cell: ({value:{name, image}}) => (
          <CustomerCell image={image} color={"dark"} name={name} />
      ),
    },
    {
      Header: "description",
      accessor: "description",
      Cell: ({ value }) => <DefaultCell value={value} />
    },
    {
      Header: "sold in 30 days",
      accessor: "soldLast30",
      Cell: ({ value }) => <DefaultCell value={value} />
    },
    {
      Header: "sold in 7 days",
      accessor: "soldLast7",
      Cell: ({ value }) => <DefaultCell value={value} />
    }
  ],

  rows: [
    {
      id: "#10421",
      seller: { name: 'aaa', image:team1},
      description: "ABC company",
      sold30: "$ 123",
      sold7: "$ 123"
    },
    {
      id: "#10422",
      seller: { name: 'bbb', image:team2},
      description: "ABC company",
      sold30: "$ 234",
      sold7: "$ 234"
    },
    {
      id: "#10423",
      seller: { name: 'ccc', image:team3},
      description: "ABC company",
      sold30: "$ 345",
      sold7: "$ 345"
    },
    {
      id: "#10423",
      seller: { name: 'ccc'},
      description: "ABC company",
      sold30: "$ 345",
      sold7: "$ 345"
    },
  ],
};

export default sellerDataGrid;
