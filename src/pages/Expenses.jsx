import React from 'react'
import { createExpense, deleteItem, fetchData } from '../helper'
import { useLoaderData } from 'react-router-dom'
import Table from '../components/Table'
import AddExpenseForm from '../components/AddExpenseForm';
import { DELETE_EXPENSE, NEW_EXPENSE } from '../routes';
import { toast } from 'react-toastify';

export function loadExpenses() {
    const expenses = fetchData("expenses");
    const budgets = fetchData("budgets");
    return { expenses, budgets }
}

export async function actionExpenses({ request }) {



    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === DELETE_EXPENSE) {
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

    if (_action === NEW_EXPENSE) {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was an issue with creating your expense.");
        }
    }
}

const Expenses = () => {

    const { expenses, budgets } = useLoaderData("expenses")

    return (
        <div className='grid-lg'>
            <div className="grid md:grid-cols-4">
                <div className="...">
                    <AddExpenseForm budgets={budgets} />
                </div>
                <div className="col-span-3">
                    <div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
                        {expenses && expenses.length > 0 ?
                            (<div>
                                <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                                    Recent Expenses <small>({expenses.length}) total</small>
                                </h2>
                                <Table expenses={expenses} />
                            </div>) : (<div className="flex justify-center">
                                <p className='text-gray-100 text-sm font-bold'>No expenses found</p></div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expenses