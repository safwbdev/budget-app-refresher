import React from 'react'
import { Chart } from "react-google-charts";
import { formatDateToLocaleString } from '../helper';

const LineChart = ({ expenseData, budgetData }) => {

    let budgetLabels = ["Budget"];
    let budgetIds = [];
    let ExpenseTypes = ["expenses"];

    function getBudgetById(id) {
        const getBudget = budgetData.find((b) => b.id === id)
        return getBudget.name
    }


    budgetData.map((bud) => budgetLabels.push(bud.name))

    expenseData.map((exp) => {
        console.log('pooop: ', getBudgetById(exp.budgetId));


        const today = new Date(exp.createdAt);

        budgetData.map((bud) => {
            if (bud.id === exp.budgetId) {
                // console.log(`${exp.name} | ${today.toLocaleString('default', { month: 'long' })}`);
                console.log(`${bud.name} | ${exp.name} | ${today.toLocaleString('default', { month: 'long' })} | ${exp.amount}`);
                if (!ExpenseTypes.find(item => item === exp.name)) {
                    ExpenseTypes.push([exp.name, bud.name, exp.amount])
                }
            }

        })

    })

    console.log(ExpenseTypes);

    const data = [
        budgetLabels,
        ["2004", 1000, 400, 900, 400, 400],
        ["2005", 1170, 460, 800, 300, 300],
        ["2006", 660, 1120, 700, 200, 200],
        ["2007", 1030, 540, 600, 100, 100],
    ];

    const options = {
        curveType: "function",
        legend: { position: "bottom" },
    };
    return (
        <div>lol
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart