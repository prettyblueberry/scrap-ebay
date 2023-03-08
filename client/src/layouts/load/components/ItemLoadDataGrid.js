import ItemDataGrid from "../../items/list/components/itemDataGrid";
import itemController from "../../../controllers/item";
import {useEffect, useState} from "react";


export default function ItemLoadDataGrid({ loads,updateSignal, ...props }){
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        itemController.getAll().then((res)=>{
            setRows(res.data);
            setFilteredRows(res.data);
        }).finally(()=>{
            setLoading(false);
        });
    }, [updateSignal]);

    useEffect(()=>{
        if(rows.length > 0){
            const filtered = rows.filter(r => loads.map(lo=>lo.id).includes(r.loadId));
            setFilteredRows(filtered);
        }
    }, [loads])

    return(
        <ItemDataGrid rows={filteredRows} loading={loading} {...props}/>
    );
}