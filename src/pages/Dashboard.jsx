import React from 'react'
import { createBudget, createExpense, deleteItem, fetchData, wait } from '../helper'
import { Link, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { BUDGET, DELETE_EXPENSE, EXPENSES, NEW_BUDGET, NEW_EXPENSE, NEW_USER } from '../routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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

    if (_action === NEW_USER) {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome ${values.userName}!`)

        } catch (e) {
            throw new Error("There was an issue");

        }
    }

    if (_action === NEW_BUDGET) {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
            return toast.success("Budget created!")
        } catch (e) {
            throw new Error("There was an issue with creating the budget.");
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
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

    return (
        <>
            {userName ? (
                <div className='dashboard'>
                    <div>
                        <div className="budgets">
                            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 px-6'>{userName}'s Budgets</h2>
                            <div className="grid grid-cols-1 gap-1 md:grid-cols-4 gap-4">
                                <div className='col-span-1 px-6'>
                                    {budgets && budgets.length > 0 ? (<AddBudgetForm />
                                    ) : (
                                        <>
                                            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6 flex justify-center items-center flex-col">
                                                <p className='text-gray-100 text-lg font-bold'>Personal budgeting is the secret to financial freedom</p>
                                            </div>
                                            <AddBudgetForm isBudgetEmpty />
                                        </>
                                    )}
                                </div>
                                <div className="col-span-1 md:col-span-3 order-first md:order-last">
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1.2,
                                                centeredSlides: true,
                                                spaceBetween: 20,
                                                enabled: true
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                spaceBetween: 40,
                                                enabled: false
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 50,
                                                enabled: false,
                                            },
                                        }}
                                        modules={[Pagination, Navigation]}
                                    >
                                        {budgets && budgets.map((bud) => (
                                            <SwiperSlide>
                                                <BudgetItem key={bud.id} budget={bud} />
                                            </SwiperSlide>)
                                        )}
                                    </Swiper>
                                    <div className="flex justify-center pt-6">
                                        <Link to={BUDGET} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                            <span>
                                                View all Budgets
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-black/10" />
                    {expenses && expenses.length > 0 ? (
                        <div className='expenses'>
                            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 px-6'>Recent Expenses</h2>
                            <div className="grid grid-cols-1 gap-1 md:grid-cols-4 gap-4">
                                <div className='col-span-1 px-6'>
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <div className="col-span-1 md:col-span-3 order-first md:order-last px-6">
                                    <div className='w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
                                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)} />
                                        {expenses.length > 8 && (
                                            <div className="flex justify-center pt-6">
                                                <Link to={EXPENSES} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                                    <span>
                                                        View all expenses
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>) : (<div>
                            <h2 className='text-gray-500  text-2xl font-bold mb-2 px-6'>No expenses found</h2>
                        </div>)}

                </div>) : (<Intro />)
            }
        </>
    )
}

export default Dashboard