import React from 'react'
import { calculateSpentByBudget, formatCurrency, formstPercentage } from '../helper';
import { Form, Link } from 'react-router-dom';
import { BUDGET } from '../routes';

const BudgetItem = ({ budget, showDelete = false }) => {

    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

    return (
        <div className='w-full block max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6'>
            <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h3>
            <p className='font-normal text-gray-700 dark:text-gray-400'>{formatCurrency(amount)} budgeted</p>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700  my-3">
                <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: `${formstPercentage(spent / amount)}` }}></div>
            </div>
            <div className="font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            <div className="flex justify-center pt-6 ">
                {showDelete ? (
                    <Form
                        method="post"
                        action="delete"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Are you sure you want to permanently delete this budget?"
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                            <span>Delete Budget</span>
                        </button>
                    </Form>
                ) : (
                    <Link to={`${BUDGET}/${id}`}>
                        <span className='inline-flex font-medium items-center text-blue-600 hover:underline'>
                            View details
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                            </svg>
                        </span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default BudgetItem