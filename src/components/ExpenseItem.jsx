import React from 'react'
import { confirmDeleteExpense, formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helper'
import { Form, Link, useFetcher } from 'react-router-dom';
import { BUDGET, DELETE_EXPENSE } from '../routes';
import { FaTrashAlt } from "react-icons/fa";

const ExpenseItem = ({ expense, showBudget }) => {
    const fetcher = useFetcher()

    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td className="p-4 border-b border-blue-gray-50">
                {expense.name.length > 10 ? `${expense.name.slice(0, 10)}...` : expense.name}</td>
            <td className="p-4 border-b border-blue-gray-50">
                {formatCurrency(expense.amount)}
            </td>
            <td className="p-4 border-b border-blue-gray-50 max-sm:hidden">
                {formatDateToLocaleString(expense.createdAt)}
            </td>
            {showBudget && (
                <td className="p-4 border-b border-blue-gray-50 max-sm:hidden">
                    <Link to={`/${BUDGET}/${budget.id}`} className='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300'>
                        {budget.name}
                    </Link>
                </td>)}
            <td className="p-4 border-b border-blue-gray-50">
                <fetcher.Form method="post" onSubmit={confirmDeleteExpense}>
                    <input type="hidden" name="_action" value={DELETE_EXPENSE} />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button
                        aria-label={`Delete ${expense.name} expense`}
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                        <span className='max-sm:hidden'>Delete</span>
                        <span className='lg:hidden'><FaTrashAlt /></span>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem