import React from 'react'
import { deleteItem, fetchData } from '../helper'
import { useLoaderData } from 'react-router-dom'
import Table from '../components/Table'
import AddExpenseForm from '../components/AddExpenseForm';

export function loadExpenses() {
    const expenses = fetchData("expenses");
    const budgets = fetchData("budgets");
    return { expenses, budgets }
}

export async function actionExpenses({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            });
            return toast.success(`Expense  deleted!`)
        } catch (e) {
            throw new Error("There was an issue with deleting your expense.");
        }
    }
}

const Expenses = () => {



    const { expenses, budgets } = useLoaderData("expenses")

    return (
        <div className='grid-lg'>
            <div className="grid grid-cols-4">
                <div className="...">
                    <AddExpenseForm budgets={budgets} />
                </div>
                <div className="col-span-3">
                    {expenses && expenses.length > 0 ?
                        (<div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
                            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                                Recent Expenses <small>({expenses.length}) total</small>
                            </h2>
                            <Table expenses={expenses} />
                        </div>) : (<p>No expenses found</p>)}
                </div>
            </div>
        </div>
    )
}

export default Expenses