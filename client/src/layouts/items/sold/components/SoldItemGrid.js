import ItemDataGrid from "../../../items/list/components/itemDataGrid";
import itemController from "../../../../controllers/item";
import {useEffect, useState} from "react";

export default function SoldItemGrid({ sellers, ...props }){
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        itemController.getSold().then((res)=>{
            setRows(res.data);
            const filtered = rows.filter(r => sellers.map(s=>s.login).includes(r.seller));
            setFilteredRows(filtered);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    useEffect(()=>{
        if(rows.length > 0){
            const filtered = rows.filter(r => sellers.map(s=>s.login).includes(r.seller));
            setFilteredRows(filtered);
        }
    }, [rows, sellers])

    return(
        <ItemDataGrid rows={filteredRows} loading={loading} {...props}/>
    );
}