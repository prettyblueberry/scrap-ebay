import VerticalBarChart from "../../../../../examples/Charts/BarCharts/VerticalBarChart";

function sellerDataGridDays({title, description, rows, dataKey, icon}){
    const verticalBarChartData = {
        labels: rows.map((r)=>r.login),
        datasets: [
            {
                label: title,
                color: "dark",
                data: rows.map((r)=> { return r[dataKey]} )
            },
        ]
    };

    return <VerticalBarChart
        icon={{ color: icon.color, component: icon.component }}
        title={ title }
        description={ description }
        chart={ verticalBarChartData }
    />
}

export default sellerDataGridDays;