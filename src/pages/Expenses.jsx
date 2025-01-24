import React from 'react'
import { deleteItem, fetchData } from '../helper'
import { useLoaderData } from 'react-router-dom'
import Table from '../components/Table'

export function loadExpenses() {
    const expenses = fetchData("expenses");
    return { expenses }
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



    const { expenses } = useLoaderData("expenses")

    return (
        <div className='grid-lg'>
            <h1>All Expenses</h1>
            {expenses && expenses.length > 0 ?
                (<div className='grid-md'>
                    <h2>Recent Expenses <small>({expenses.length}) total</small></h2>
                    <Table expenses={expenses} />
                </div>) : (<p>No expenses found</p>)}
        </div>
    )
}

export default Expenses