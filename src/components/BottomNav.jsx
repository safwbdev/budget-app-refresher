import React from 'react'
import { Form, Link } from 'react-router-dom'
import { BUDGET, EXPENSES, ROOT } from '../routes'
import { FaHome, FaWallet, FaMoneyBillAlt, FaSignOutAlt } from "react-icons/fa";

const BottomNav = () => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 lg:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link to={ROOT} aria-label={'home'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <FaHome className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
                </Link>
                <Link to={BUDGET} aria-label={'budgets'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <FaWallet className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Budgets</span>
                </Link>
                <Link to={EXPENSES} aria-label={'Expenses'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <FaMoneyBillAlt className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Expenses</span>
                </Link>
                <Form method='post' action='logout' className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group" onSubmit={(event) => {
                    if (!confirm("Log out?")) {
                        event.preventDefault()
                    }
                }}>
                    <button type='submit'
                        className="inline-flex flex-col items-center justify-center px- hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <FaSignOutAlt className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Log Out</span>
                    </button>
                </Form>

            </div>
        </div >
    )
}

export default BottomNav