import React from 'react'
import { createExpense, deleteItem, getAllMatchingItems } from '../helper'
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { DELETE_EXPENSE, NEW_EXPENSE } from '../routes';

export async function loadBudget({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if (!budget) {
        throw new Error("The budget doesn't exist");
    }
    return { budget, expenses }
}

export async function actionBudget({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === DELETE_EXPENSE) {
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

    if (_action === NEW_EXPENSE) {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was an issue with creating your expense.");
        }
    }
}

const Budget = () => {
    const { budget, expenses } = useLoaderData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6" >
            <div className="col-span-1">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            <div className="col-span-1 md:col-span-3 ">
                <div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
                    {expenses && expenses.length > 0 ? (
                        <Table expenses={expenses} showBudget={false} />
                    ) : (
                        <div className="flex justify-center">
                            <p className='text-gray-100 text-sm font-bold'>No expenses found</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div >
    )
}

export default Budget