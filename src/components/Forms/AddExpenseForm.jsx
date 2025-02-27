import React, { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { NEW_EXPENSE } from '../../routes';
import { FaPlus } from "react-icons/fa";

const AddExpenseForm = ({ budgets, isHome = false }) => {

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const isLoading = fetcher.state === "loading";

    const formRef = useRef();
    const focusRef = useRef();

    const [openFormWindow, setOpenFormWindow] = useState(false);

    useEffect(() => {

        if (isLoading) {
            formRef.current.reset();
            focusRef.current.focus();
            setOpenFormWindow(false)
        }
    }, [isLoading])

    return (
        <>
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline block md:hidden ${isHome ? 'w-full' : 'floatingBtn'}`}
                onClick={() => setOpenFormWindow(true)}

            >{isHome ? 'Add New Budget' : <FaPlus className="w-5 h-5 my-2 text-gray-500 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-500" />}
            </button>
            <div className={`md:block ${openFormWindow ? 'formBackdrop' : 'hidden'}`}>

                <div className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6">
                    <fetcher.Form method='post' ref={formRef}>
                        <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Add new{" "}
                            <span className='text-blue-500'>
                                {budgets && budgets.length === 1 && `${budgets.map((bud) => bud.name)}`}
                            </span> Expense
                        </h3>
                        <div className="expense-inputs">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-100 text-sm font-bold mb-2"
                                    htmlFor="newExpense">
                                    Expense</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newExpense"
                                    name="newExpense"
                                    placeholder='e.g. coffee'
                                    ref={focusRef}
                                    required
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-100 text-sm font-bold mb-2"
                                    htmlFor="newExpenseAmount">
                                    Amount
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newExpenseAmount"
                                    inputMode='decimal'
                                    name="newExpenseAmount"
                                    placeholder='e.g. 3.50'
                                    required
                                    step={0.01}
                                    type="number"
                                />
                            </div>
                            <div className="mb-4" hidden={budgets && budgets.length === 1}>
                                <label
                                    className="block text-gray-100 text-sm font-bold mb-2"
                                    htmlFor="newExpenseBudget">
                                    Budget Category
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newExpenseBudget"
                                    name="newExpenseBudget"
                                    required>
                                    {budgets && budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className={`flex justify${openFormWindow ? '-between' : '-center'}`}>
                            <input
                                name="_action"
                                type="hidden"
                                value={NEW_EXPENSE} />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={isSubmitting}
                                type="submit">
                                <span>
                                    {isSubmitting ? 'Submitting...' : 'Create Expense'}
                                </span>
                            </button>
                            {openFormWindow && (<button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type='text'
                                onClick={() => setOpenFormWindow(false)}
                            >
                                <span>Cancel</span>
                            </button>)}
                        </div>
                    </fetcher.Form>
                </div>
            </div>
        </>
    )
}

export default AddExpenseForm