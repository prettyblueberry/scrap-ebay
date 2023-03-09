import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import MDBox from "../../../../components/MDBox";
import ImageCell from "../../../items/list/components/imageCell";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const usdPrice = {
    type: 'number',
    width: 200,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
};

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center"},
    { field: 'login', headerName: 'Login', width: 80 , headerAlign:'center',  align:"center"},
    { field: 'title', headerName: 'Title', width: 100 , headerAlign:'center',  align:"center"},
    { field: 'desc', headerName: 'Description', width: 80 , headerAlign:'center'},
    { field: 'soldLast1', headerName: 'SoldIn1D', align:"right", headerAlign:'center', ...usdPrice},
    { field: 'soldLast7', headerName: 'SoldIn7D', align:"right", headerAlign:'center', ...usdPrice},
    { field: 'soldLast30', headerName: 'SoldIn30D', align:"right", headerAlign:'center', ...usdPrice },
];

function SellerDataGrid({ rows, setFilteredRows, ...props}) {
    const [pageSize, setPageSize] = React.useState(25);
    const [selectionModel, setSelectionModel] = React.useState([]);


    useEffect(()=>{
        setSelectionModel(rows.map((r)=>r.id));
    }, [rows]);

    return (
        <div style={{width: '100%'}}>
            <DataGrid rows={rows} columns={columns}  components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress }} initialState={{
                columnVisibilityModel: {
                    id: false,
                    number: true,
                    image: true,
                    title: true,
                    watcher: true,
                    price: true,
                    shippingPrice: true,
                    quantityAvailable: true,
                    quantitySold: true,
                    condition: true
                }
            }}
              componentsProps={{
                  toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                  },
              }}

              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              autoHeight
              checkboxSelection
              selectionModel={selectionModel}
              onSelectionModelChange={(changed) => {
                  setSelectionModel(changed);
                  setFilteredRows(rows.filter((r)=>changed.includes(r.id) ));
              }}
                      {...props}
                //loading
            />
        </div>
    );
}

export default SellerDataGrid;