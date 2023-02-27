import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import ImageCell from "../../list/components/imageCell";

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type: "number"},
    { field: 'number', headerName: 'Number', width: 80 , headerAlign:'center',  align:"center", type: "number"},
    { field: 'image', headerName: 'Image', width: 100 , headerAlign:'center', align:"center",
        renderCell: ({ value, row } ) => (
            <ImageCell image={value} name={row.title} />
        ),
    },
    { field: 'title', headerName: 'Title', width: 150 , headerAlign:'center'},
    { field: 'watcher', headerName: 'Seller', width: 80, headerAlign:'center' },
    { field: 'price', headerName: 'Price', width: 100, align:"right", headerAlign:'center', type:"number"},
    { field: 'shippingPrice', headerName: 'Shipping Price', width: 150, align:"right", headerAlign:'center', type:"number" },
    { field: 'quantityAvailable', headerName: 'Quantity Available', width: 150, align:"right", headerAlign:'center', type:"number" },
    { field: 'quantitySold', headerName: 'Solid Quantity', width: 150, align:"right", headerAlign:'center', type:"number" },
    { field: 'simpleVariation', headerName: 'Simple / Variation', width: 150, align:"right", headerAlign:'center' },
    { field: 'condition', headerName: 'Condition', headerAlign:'center' },
];

function ItemDataGrid({ rows }) {
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
                  // loading
            />
        </div>
    );
}

export default ItemDataGrid;