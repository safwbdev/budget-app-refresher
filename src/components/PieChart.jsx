import React from 'react'
import { Chart } from "react-google-charts";


const PieChart = ({ budgetData }) => {
    const pieData = [
        ["USD", "Amount Spent"]
    ];

    budgetData.map((bud) => {
        pieData.push([bud.name, bud.amount])
    })

    const pieOptions = {
        pieHole: 0.2,
        // is3D: true,
    };
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={pieData}
            options={pieOptions}
        />
    )
}

export default PieChart