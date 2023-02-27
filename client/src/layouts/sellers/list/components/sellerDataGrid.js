import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center"},
    { field: 'login', headerName: 'Login', width: 80 , headerAlign:'center',  align:"center"},
    { field: 'seller', headerName: 'Name', width: 100 , headerAlign:'center',  align:"center"},
    { field: 'description', headerName: 'Desc', width: 80 , headerAlign:'center'},
    { field: 'soldLast1', headerName: 'SoldIn1D', width: 100, align:"right", headerAlign:'center', type:"number"},
    { field: 'soldLast7', headerName: 'SoldIn7D', width: 100, align:"right", headerAlign:'center', type: "number"},
    { field: 'soldLast30', headerName: 'SoldIn30D', width: 100, align:"right", headerAlign:'center', type:"number" },
];

function SellerDataGrid({ rows, setFilteredRows}) {
    const [pageSize, setPageSize] = React.useState(10);
    const [selectionModel, setSelectionModel] = React.useState(() => rows.map((r)=>r.id));


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
              rowsPerPageOptions={[25, 50, 100]}
              pagination
              autoHeight
              checkboxSelection
              selectionModel={selectionModel}
              onSelectionModelChange={(changed) => {
                  setSelectionModel(changed);
                  setFilteredRows(rows.filter((r)=>changed.includes(r.id) ));
              }}
              // loading
            />
        </div>
    );
}

export default SellerDataGrid;