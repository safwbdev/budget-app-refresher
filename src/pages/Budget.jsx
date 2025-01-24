import React from 'react'
import { createExpense, deleteItem, getAllMatchingItems } from '../helper'
import { useLoaderData } from 'react-router-dom';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export async function loadBudget({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets", key: "id", value: params.id
    })[0];
    const expenses = await getAllMatchingItems({
        category: "expenses", key: "budgetId", value: params.id
    });

    if (!budget) {
        throw new Error("The budget doesn't exist");
    }
    return { budget, expenses }

}

export async function actionBudget({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            });
            return toast.success(`Expense deleted!`)
        } catch (e) {
            throw new Error("There was an issue with deleting your expense.");
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was an issue with creating your expense.");
        }
    }
}

const Budget = () => {
    const { budget, expenses } = useLoaderData()
    return (
        <div className='grid-lg'>
            <h1><span>{budget.name}</span> Overview</h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (<div className='grid-md'>
                <h2>
                    <span>{budget.name}</span> Expenses
                </h2>
                <Table expenses={expenses} showBudget={false} />
            </div>)}
        </div>
    )
}

export default Budget