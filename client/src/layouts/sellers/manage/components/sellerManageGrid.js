import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function SellerManageGrid() {
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                editMode="row"
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </div>
    );
}

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", editable: true},
    { field: 'login', headerName: 'Login', width: 80 , headerAlign:'center',  align:"center", editable: true},
    { field: 'seller', headerName: 'Name', width: 100 , headerAlign:'center',  align:"center", editable: true},
    { field: 'description', headerName: 'Desc', width: 80 , headerAlign:'center', editable: true},
];

const rows = [
    {id: "123", login: "qqwe", seller: "werwer", description: "werwer"},
    {id: "234", login: "qqwe", seller: "werwer", description: "werwer"},
    {id: "456", login: "qqwe", seller: "werwer", description: "werwer"}
];