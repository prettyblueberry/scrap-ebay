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

export default function LoadDataGrid({setFilteredRows}) {
    const [rows, setRawRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState(() => rows.map((r)=>r.id));

    const setRows = (rows)=> {
        return setRawRows([...rows.map((r, i)=>({...r, no: i + 1}))]);
    };
    useEffect(() => {
        loadController.getAll().then((res)=>{
            setRows(res.data);
        });
    }, []);

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
        />
    );
}

const columns = [
    { field: 'id', headerName: 'Id', width: 50 , hide: true, align:"center", type:'number', editable: false},
    { field: 'datetimeCreated', headerName: 'DateCreated', width:150,  headerAlign:'center', type:'date', editable: false, align: "center", renderCell: ({value})=>(moment(value).format('MM/DD/yyyy hh:mm:ss'))},
    { field: 'sellerLogin', headerName: 'SellerLogin', width: 300 , headerAlign:'center', type:'text',  align:"center", editable: false},
    { field: 'sellerTitle', headerName: 'SellerTitle', width: 150 , headerAlign:'center', type: 'text',  align:"center", editable: false},
    { field: 'srcUrl', headerName: 'SourceURL', width: 100,  headerAlign:'center', type: 'text', editable: false, cellClassName: "actions", align: "center",
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