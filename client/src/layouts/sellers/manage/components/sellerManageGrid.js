import * as React from 'react';
import FullEditDataGrid from "../../../../components/FullEditDataGrid";
import { useEffect, useState } from "react";
import sellerController from "../../../../controllers/seller";

export default function SellerManageGrid() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        sellerController.getAll().then((res)=>{
            setRows(res.data);
        });
    }, []);

    const onSaveRow = (id, updatedRow, rows, oldRow) =>{
        sellerController.saveRow(updatedRow).then((res)=>{
            const dbRow = res.data;
            setRows(rows.map(r => (r.id === updatedRow.id ? {...dbRow}: r)));
        });
    };

    const onDeleteRow = (id, oldRow, rows) => {
        sellerController.deleteRow(id).then((res)=>{
            const dbRow = res.data;
            setRows(rows.filter(r=> r.id !== dbRow.id));
        });
    };

    return (
        <FullEditDataGrid
            columns={columns}
            rows={rows}
            onSaveRow={onSaveRow}
            onDeleteRow={onDeleteRow}
        />
    );
}

const columns = [
    { field: 'no', headerName: 'No', width: 50 , align:"center", type:'number', editable: false},
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type:'number', editable: true},
    { field: 'login', headerName: 'Login', width: 100 , headerAlign:'center', type:'text',  align:"center", editable: true},
    { field: 'title', headerName: 'Title', width: 150 , headerAlign:'center', type: 'text',  align:"center", editable: true},
    { field: 'desc', headerName: 'Description', width: 250,  headerAlign:'center', type: 'text', editable: true},
    { field: 'dateCreated', headerName: 'DateCreated', width:150,  headerAlign:'center', type:'date', editable: false, align: "center"},
];


