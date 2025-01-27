import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

const AddExpenseForm = ({ budgets }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6">
            <fetcher.Form method='post' ref={formRef}>
                <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Add new{" "}
                    <span>
                        {budgets.length === 1 && `${budgets.map((bud) => bud.name)}`}
                    </span> Expense
                </h3>
                <div className="expense-inputs">
                    <div className="mb-4">
                        <label htmlFor="newExpense" className="block text-gray-100 text-sm font-bold mb-2">Expense</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" name="newExpense" id="newExpense" placeholder='e.g. coffee' ref={focusRef} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newExpenseAmount" className="block text-gray-100 text-sm font-bold mb-2">Amount</label>
                        <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" step={0.01} inputMode='decimal' name="newExpenseAmount" id="newExpenseAmount" placeholder='e.g. 3.50' required />
                    </div>
                    <div className="mb-4" hidden={budgets.length === 1}>
                        <label htmlFor="newExpenseBudget" className="block text-gray-100 text-sm font-bold mb-2">Budget Category</label>
                        <select name="newExpenseBudget" id="newExpenseBudget" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" required>
                            {budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    <input type="hidden" name="_action" value='createExpense' />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
                        <span>
                            {isSubmitting ? 'Submitting...' : 'Create Expense'}
                        </span>
                    </button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm