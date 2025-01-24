import React from 'react'
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helper'
import { Form, Link, useFetcher } from 'react-router-dom';

const ExpenseItem = ({ expense, showBudget }) => {
    const fetcher = useFetcher()

    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
            {showBudget && (<td><Link to={`/budget/${budget.id}`}>{budget.name}</Link></td>)}
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value={"deleteExpense"} />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button type="submit" aria-label={`Delete ${expense.name} expense`}>
                        <span>Delete</span>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem