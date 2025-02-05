import React from 'react'
import { Chart } from "react-google-charts";
import { calculateSpentByBudget } from '../helper';


const PieChart = ({ budgetData }) => {
    const pieData = [["USD", "Amount Spent"]];

    budgetData.map((bud) => pieData.push([bud.name, calculateSpentByBudget(bud.id)]))

    const pieOptions = { pieHole: 0.2 };

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