import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import ImageCell from "../../list/components/imageCell";
import MDBox from "../../../../components/MDBox";
import LinkIcon from "@mui/icons-material/LinkOutlined";

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type: "number"},
    { field: 'itemNumber', headerName: 'Number', width: 200 , headerAlign:'center',  align:"center", type: "string"},
    { field: 'image', headerName: 'Image', width: 150 , headerAlign:'center', align:"center",
        renderCell: ({ value, row }) => (
            <MDBox m={1}><ImageCell image={value} name={row.title}/></MDBox>
        ),
    },
    { field: 'title', headerName: 'Title', width: 150 , headerAlign:'center'},
    { field: 'seller', headerName: 'Seller', width: 200, headerAlign:'center' },
    { field: 'priceWithCurrency', headerName: 'Price', width: 100, align:"right", headerAlign:'center', type:"number"},
    { field: 'available', headerName: 'Quantity Available', width: 150, align:"right", headerAlign:'center', type:"number" },
    { field: 'Sold', headerName: 'Solid Quantity', width: 150, align:"right", headerAlign:'center', type:"number" },
    { field: 'itemLocation', headerName: 'ItemLocation', width: 150, align:"right", headerAlign:'center' },
    { field: 'url', headerName: 'Link', width: 100,  headerAlign:'center', type: 'string', editable: false, cellClassName: "actions", align: "center",
        renderCell: ({ value }) => {
            return (
                <a href={value} target={"_blank"}>
                    <GridActionsCellItem
                        icon={<LinkIcon />}
                        label="Link"
                        color="inherit"
                    />
                </a>
            )
        }
    },
    { field: 'datetimeCreated', headerName: 'DatetimeCreated', width: 200,  headerAlign:'center' },
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
                  rowHeight={200}
                  // loading
            />
        </div>
    );
}

export default ItemDataGrid;