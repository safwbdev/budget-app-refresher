import React from 'react'
import ExpenseItem from './ExpenseItem'

const Table = ({ expenses, showBudget = true }) => {

    const tableHeaders = ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""];
    return (
        <table className="w-full text-left table-auto min-w-max dark:text-gray-100">
            <thead>
                <tr>
                    {tableHeaders.map((i, index) => (
                        <th key={index} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">{i}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id} className="">
                        <ExpenseItem expense={expense} showBudget={showBudget} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table