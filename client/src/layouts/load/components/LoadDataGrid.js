import * as React from 'react';
import DeleteOnlyDataGrid from "../../../components/DeleteOnlyDataGrid";
import { useEffect, useState } from "react";
import loadController from "../../../controllers/load";
import moment from "moment";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import {
    GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {Link} from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';


export default function LoadDataGrid({setFilteredRows,updateSignal,loadingData, ...props}) {
    const [rows, setRawRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState(() => rows.map((r)=>r.id));
    const [loading, setLoading] = useState(false);

    const setRows = (rows)=> {
        return setRawRows([...rows.map((r, i)=>({...r, no: i + 1}))]);
    };

    const getRows = () => {
        setLoading(true);
        loadController.getAll().then((res)=>{
            const sorted = res.data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.datetimeCreated) - new Date(a.datetimeCreated);
            });
            setRows(sorted);
        }).finally(()=>{
            setLoading(false);
        });
    };

    useEffect(() => {
        getRows();

    },[updateSignal]);
    useEffect(()=>{
        if(loadingData === true)
            setLoading(true);
    },[loadingData]);


    const onDeleteRow = (id, oldRow, rows) => {
        loadController.deleteRow(id).then((res)=>{
            const dbRow = res.data;
            setRows(rows.filter(r=> r.id !== dbRow.id));
        }).catch((err)=>{
            setRows(rows);
        });
    };

    return (
        <DeleteOnlyDataGrid
            columns={columns}
            rows={rows}
            onDeleteRow={onDeleteRow}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={(changed) => {
                setSelectionModel(changed);
                setFilteredRows(rows.filter((r) => changed.includes(r.id) ));
            }}
            slots={{
                loadingOverlay: LinearProgress,
            }}
            loading={loading}
            defaultPageSize={10}
            {...props}

        />
    );
}

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type:'number', editable: false},
    { field: 'datetimeCreated', headerName: 'DateCreated', width:150,  headerAlign:'center', type:'date', editable: false, align: "center", renderCell: ({value})=>(moment(value).format('MM/DD/yyyy hh:mm:ss'))},
    { field: 'sellerLogin', headerName: 'SellerLogin', width: 300 , headerAlign:'center', type:'string',  align:"center", editable: false},
    { field: 'sellerTitle', headerName: 'SellerTitle', width: 150 , headerAlign:'center', type: 'string',  align:"center", editable: false},
    { field: 'srcUrl', headerName: 'SourceURL', width: 100,  headerAlign:'center', type: 'string', editable: false, cellClassName: "actions", align: "center",
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
];