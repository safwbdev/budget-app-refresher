import React from 'react'
import { createBudget, createExpense, deleteItem, fetchData, wait } from '../helper'
import { Link, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';


export function loadDashboard() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}
export async function actionDashboard({ request }) {
    await wait();
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome ${values.userName}!`)

        } catch (e) {
            throw new Error("There was an issue");

        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
            return toast.success("Budget created!")
        } catch (e) {
            throw new Error("There was an issue with creating the budget.");
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
    if (_action === "deleteExpense") {
        console.log('del');
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

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

    return (
        <>
            {userName ? (
                <div className='dashboard'>
                    <div>
                        <div className="budgets">
                            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{userName}'s Budgets</h2>
                            <div className="grid grid-cols-4">
                                {budgets.map((bud) => (<BudgetItem key={bud.id} budget={bud} />))}
                                {budgets && budgets.length > 0 ? (<AddBudgetForm />
                                ) : (<div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom</p>
                                    <p>Create a budget to get started</p>
                                    <AddBudgetForm />
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-black/10" />
                    {expenses && expenses.length > 0 && (
                        <div className='expenses'>
                            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Recent Expenses</h2>
                            <div className="grid grid-cols-4 gap-4">
                                <div className='...'>
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <div className="col-span-3">
                                    <div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>

                                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)} />
                                        {expenses.length > 8 && (
                                            <div className="flex justify-center pt-6">
                                                <Link to="expenses" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                                    <span>
                                                        View all expenses
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>)}

                </div>) : (<Intro />)
            }
        </>
    )
}

export default Dashboard