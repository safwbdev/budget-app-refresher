import React from 'react'
import { Form, Link } from 'react-router-dom'
import { FaHome, FaWallet, FaMoneyBillAlt, FaSignOutAlt } from "react-icons/fa";
import { Links } from '../../links';
import { BUDGET, EXPENSES, ROOT } from '../../routes';
import { confirmLogout } from '../../helper';

function getIcon(params) {
    switch (true) {
        case params === ROOT:
            return <FaHome className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            break;
        case params === BUDGET:
            return <FaWallet className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            break;
        case params === EXPENSES:
            return <FaMoneyBillAlt className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            break;
        default:
            break;
    }
}

const BottomNav = () => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 lg:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {Links && Links.map((link, index) => (
                    <Link
                        aria-label={'budgets'}
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                        key={index}
                        to={link.url}>
                        {getIcon(link.url)}
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{link.label}</span>
                    </Link>
                ))}
                <Form
                    action='logout'
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    method='post'
                    onSubmit={confirmLogout}>
                    <button
                        className="inline-flex flex-col items-center justify-center px- hover:bg-gray-50 dark:hover:bg-gray-800 group"
                        type='submit'>
                        <FaSignOutAlt className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Log Out</span>
                    </button>
                </Form>
            </div>
        </div >
    )
}

export default BottomNav