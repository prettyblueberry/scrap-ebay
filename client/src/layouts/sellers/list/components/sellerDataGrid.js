import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center"},
    { field: 'login', headerName: 'Login', width: 80 , headerAlign:'center',  align:"center"},
    { field: 'seller', headerName: 'Name', width: 100 , headerAlign:'center',  align:"center"},
    { field: 'description', headerName: 'Description', width: 150 , headerAlign:'center'},
    { field: 'soldLast30', headerName: 'SoldIn30D', width: 100, headerAlign:'center' },
    { field: 'soldLast7', headerName: 'SoldIn7D', width: 100, align:"right", headerAlign:'center'}
];

function SellerDataGrid({ rows }) {
    const [pageSize, setPageSize] = React.useState(10);

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
                // loading
            />
        </div>
    );
}

export default SellerDataGrid;