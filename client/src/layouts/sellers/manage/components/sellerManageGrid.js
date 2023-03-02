import * as React from 'react';
import FullEditDataGrid from "../../../../components/FullEditDataGrid";

export default function SellerManageGrid() {
    return (
        <FullEditDataGrid columns={columns} rows={rows} />
    );
}

const columns = [
    { field: 'no', headerName: 'No', width: 50 , align:"center", type:'number', editable: false},
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type:'number', editable: true},
    { field: 'login', headerName: 'Login', width: 100 , headerAlign:'center', type:'text',  align:"center", editable: true},
    { field: 'title', headerName: 'Title', width: 150 , headerAlign:'center', type: 'text',  align:"center", editable: true},
    { field: 'desc', headerName: 'Description', width: 250,  headerAlign:'center', type: 'text', editable: true},
    { field: 'dateCreated', headerName: 'DateCreated', width:150,  headerAlign:'center', type:'date', editable: true, align: "center"},
];

const rows = [
    {
        no: 1,
        id: 1,
        login: "asdf",
        title: 25,
        desc: "wewefgw",
        dateCreated: new Date(),
    },
    {
        no: 2,
        id: 2,
        login: "asdf",
        title: 25,
        desc: "wewefgw",
        dateCreated: new Date(),
    },
    {
        no: 3,
        id: 3,
        login: "asdf",
        title: 25,
        desc: "wewefgw",
        dateCreated: new Date(),
    },
    {
        no: 5,
        id: 5,
        login: "asdf",
        title: 25,
        desc: "wewefgw",
        dateCreated: new Date(),
    },
];



