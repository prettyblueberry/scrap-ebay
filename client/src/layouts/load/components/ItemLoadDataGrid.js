import ItemDataGrid from "../../items/list/components/itemDataGrid";
import itemController from "../../../controllers/item";
import {useEffect, useState} from "react";

export default function ItemLoadDataGrid({ loadId,updateSignal, ...props }){
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pastLoadIds, setPastLoadIds] = useState([]);

    useEffect(() => {
        if(loadId && !pastLoadIds.includes(loadId)){
            setLoading(true);
            itemController.getByLoadIds(loadId).then((res)=>{
                setRows(rows.concat(res.data));
                setPastLoadIds([...pastLoadIds, loadId])
                // setFilteredRows(res.data);
            }).finally(()=>{
                setLoading(false);
            });
        }
    }, [updateSignal, loadId]);

    useEffect(()=>{
        if(rows.length > 0){
            const filtered = rows.filter(r => loadId === r.loadId);
            setFilteredRows(filtered);
        }
    }, [loadId, rows, updateSignal])

    return(
        <ItemDataGrid rows={filteredRows} loading={loading} {...props}/>
    );
}