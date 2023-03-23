import * as React from 'react';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {useEffect, useState} from "react";
import sellerController from "../../../controllers/seller";
import loadController from "../../../controllers/load";
import DownloadIcon from "@mui/icons-material/Download";
import MDSnackbar from "../../../components/MDSnackbar";



function SellerSelectGrid(props) {
    const [pageSize, setPageSize] = React.useState(25);
    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(false);

    const [infoSB, setInfoSB] = useState(false);
    const openInfoSB = () => setInfoSB(true);
    const closeInfoSB = () => setInfoSB(false);
    const renderInfoSB = (
        <MDSnackbar
            icon="warning"
            title="Please Wait."
            content="It takes several minutes to load all data from eBay."
            dateTime=""
            open={infoSB}
            onClose={closeInfoSB}
            close={closeInfoSB}
        />
    );


    useEffect(()=>{
        setLoading(true);
        sellerController.getAll().then((res)=>{
            setLoading(false);
            setRows(res.data);
        });
    }, []);

    const handleDownloadClick = (login) => {
        return () => {
            setLoading(true);
            openInfoSB();
            loadController.loadStore(login).then(()=>{
                //setUpdateSignal(updateSignal + 1);
            }).finally(()=>{
                setLoading(false);
            });
        }
    };

    const columns = [
        { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center"},
        { field: 'login', headerName: 'Login', width: 150 , headerAlign:'center',  align:"center"},
        { field: 'title', headerName: 'Title', width: 180 , headerAlign:'center',  align:"center"},
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 80,
            cellClassName: "actions",
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<DownloadIcon />}
                        label="Download"
                        className="textPrimary"
                        onClick={handleDownloadClick(row.login)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    return (
        <div style={{width: '100%'}}>
            <DataGrid rows={rows} columns={columns}  components={{ LoadingOverlay: LinearProgress }} initialState={{
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

              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              autoHeight
                      loading={loading}
                      {...props}
                //loading
            />
            {renderInfoSB}

        </div>
    );
}

export default SellerSelectGrid;