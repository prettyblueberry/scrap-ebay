// implement from https://github.com/mui/mui-x/blob/v5.17.16/docs/data/data-grid/editing/FullFeaturedCrudGrid.tsx
// the source is live on https://codesandbox.io/s/mui-table-crud-hrp1jw?file=/demo.tsx
// translate to javascript and custom it by Blueberry 03/02/2023

import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridActionsCellItem,
} from "@mui/x-data-grid";

function DefaultToolbar(props) {
    const {internalRows, setInternalRows, setRowModesModel } = props;

    const handleClick = () => {
        const newId = Math.max(...internalRows.map((r)=>r.id * 1)) + 1;
        setInternalRows((oldRows) => {
            return [...oldRows, { id: newId, name: "", age: "", isNew: true }]
        });
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: "name" }
        }));
    };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}


function FullFeaturedCrudGrid({columns, rows, defaultPageSize, onSaveRow, onDeleteRow, ...props}) {
    const [internalRows, setInternalRows] = React.useState(rows);
    const [rowModesModel, setRowModesModel] = React.useState(
        {}
    );

    const handleRowEditStart = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setInternalRows(internalRows.filter((row) => row.id !== id));
        onDeleteRow(id, internalRows.find((row) => row.id === id), internalRows);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = internalRows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setInternalRows(internalRows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow};
        if(!updatedRow.isNew) updatedRow.isNew = false;
        const oldRow = internalRows.find((r)=>r.id === updatedRow.id);
        setInternalRows(internalRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        onSaveRow(updatedRow.id, updatedRow, internalRows, oldRow);
        return updatedRow;
    };

    const appendedColumns = [
            ...columns,
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    //pagination
    const [pageSize, setPageSize] = React.useState(defaultPageSize);

    return (
            <DataGrid
                rows={internalRows}
                columns={appendedColumns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                components={{
                    Toolbar: DefaultToolbar
                }}
                componentsProps={{
                    toolbar: { internalRows, setInternalRows, setRowModesModel }
                }}
                experimentalFeatures={{ newEditingApi: true }}

                //pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                {...props}
            />
    );
}

FullFeaturedCrudGrid.defaultProps = {
    //action
    onSaveRow: (id, updatedRow, rows, oldRow)=>{
        console.log("save row", updatedRow);
    },
    onDeleteRow: (id, oldRow, rows) => {
        console.log("delete row", oldRow);
    },

    initialState: {
        columnVisibilityModel: {
            id: false
        }
    },
    autoHeight: true,

    //pagination
    pagination: true,
    defaultPageSize: 25,
    rowsPerPageOptions: [25, 50, 100],
}

export default FullFeaturedCrudGrid;
