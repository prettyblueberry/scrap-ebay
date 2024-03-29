import * as React from 'react';
import DeleteOnlyDataGrid from "../../../components/DeleteOnlyDataGrid";
import { useEffect, useState } from "react";
import userController from "../../../controllers/user";
import authController from "../../../controllers/auth";

export default function UserDataGrid() {
    const [rows, setRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState(() => rows.map((r)=>r.id));
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        userController.getAll().then((res)=>{
            setRows(res.data);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const onDeleteRow = (id, oldRow, cRows) => {
        const auth = authController.getAuth();
        const curUserId = auth.user.id;
        if(curUserId === id) {
            setRows([...rows]);
            return;
        }
        userController.deleteRow(id).then((res)=>{
            const dbRow = res.data;
            setRows(rows.filter(r=> r.id !== dbRow.id));
        }).catch((err)=>{
            setRows([...rows]);
        });
    };

    return (
        <DeleteOnlyDataGrid
            columns={columns}
            rows={rows}
            onDeleteRow={onDeleteRow}
            selectionModel={selectionModel}
            loading={loading}
        />
    );
}

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type:'number', editable: false},
    { field: 'name', headerName: 'Name', width:150,  headerAlign:'center', type:'date', editable: false, align: "center"},
    { field: 'email', headerName: 'Email', width: 300 , headerAlign:'center', type:'string',  align:"center", editable: false},
];