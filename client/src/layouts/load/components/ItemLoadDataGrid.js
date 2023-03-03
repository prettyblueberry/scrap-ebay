import ItemDataGrid from "../../items/list/components/itemDataGrid";
import itemController from "../../../controllers/item";
import {useEffect, useState} from "react";


export default function ItemLoadDataGrid({ loads }){
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    useEffect(() => {
        itemController.getAll().then((res)=>{
            setRows(res.data);
            setFilteredRows(res.data);
        });
    }, []);

    useEffect(()=>{
        if(rows.length > 0){
            const filtered = rows.filter(r => loads.map(lo=>lo.id).includes(r.loadId));
            console.log("filtered", filtered);
            setFilteredRows(filtered);
        }
    }, [loads])

    return(
        <ItemDataGrid rows={filteredRows}/>
    );
}