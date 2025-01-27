import React from 'react'
import ExpenseItem from './ExpenseItem'

const Table = ({ expenses, showBudget = true }) => {

    return (
        // <div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
        <table className="w-full text-left table-auto min-w-max dark:text-gray-100">
            <thead class="">
                <tr>
                    {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
                        <th key={index} class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">{i}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id} class="">
                        <ExpenseItem expense={expense} showBudget={showBudget} />
                    </tr>
                ))}
            </tbody>
        </table>
        // </div>
    )
}

export default Table