import * as React from 'react';
import DeleteOnlyDataGrid from "../../../components/DeleteOnlyDataGrid";
import { useEffect, useState } from "react";
import loadController from "../../../controllers/load";
import moment from "moment";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import {
    GridActionsCellItem,
} from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';


export default function LoadDataGrid({dataQuery, setSelectedLoadId,updateSignal,loadingData, ...props}) {
    const [rows, setRawRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState();
    const [loading, setLoading] = useState(false);

    const setRows = (rows)=> {
        return setRawRows([...rows.map((r, i)=>({...r, no: i + 1}))]);
    };

    const getRows = () => {
        setLoading(true);
        loadController.getAll(dataQuery).then((res)=>{
            const sorted = res.data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.datetimeCreated) - new Date(a.datetimeCreated);
            });
            setRows(sorted);
            if(sorted.length > 0) {
                let newModel = [];
                const selectedId = sorted[0].id;
                newModel.push(selectedId);
                setSelectionModel(newModel);
                setSelectedLoadId(selectedId);
            }
        }).finally(()=>{
            setLoading(false);
        });
    };

    useEffect(() => {
        getRows();

    },[updateSignal, dataQuery]);

    useEffect(()=>{
        if(loadingData === true)
            setLoading(true);
    },[loadingData]);


    const onDeleteRow = (id, oldRow, rows) => {
        loadController.deleteRow(id).then((res)=>{
            const dbRow = res.data;
            setRows(rows.filter(r=> r.id !== dbRow.id));
        }).catch((err)=>{
            console.error(err);
            setRows(rows);
        });
    };

    return (
        <DeleteOnlyDataGrid
            columns={columns}
            rows={rows}
            onDeleteRow={onDeleteRow}
            selectionModel={selectionModel}
            onSelectionModelChange={(changed) => {
                setSelectionModel(changed);
                if(changed.length > 0)
                    setSelectedLoadId(changed[0]);
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
    { field: 'isSchedule', headerName: 'Schedule/Manual', width: 150 , headerAlign:'center', type: 'string',  align:"center", editable: false, renderCell:({value}) => value * 1 === 1 ? "S" : "M" },
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
    { field: 'timeSavedServer', headerName: 'TimeSavedServer', width:150,  headerAlign:'center', type:'string', editable: false, align: "center", renderCell:({row}) => row.datetimeCreated.replace("T", " ").substring(0,19) }

];