import React from 'react'
import { calculateSpentByBudget, confirmDeleteBudget, formatCurrency, formstPercentage } from '../helper';
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
                        onSubmit={confirmDeleteBudget}
                    >
                        <button
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            type="submit" >
                            <span>Delete Budget</span>
                        </button>
                    </Form>
                ) : (
                    <Link to={`/${BUDGET}/${id}`}>
                        <span className='inline-flex font-medium items-center text-blue-600 hover:underline'>
                            View details
                        </span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default BudgetItem