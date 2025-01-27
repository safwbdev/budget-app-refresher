import React, { useEffect, useRef } from 'react'
import { Form, useFetcher } from 'react-router-dom'

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state == "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6">
            <fetcher.Form method='post' ref={formRef}>
                <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>New Budget</h3>
                <div className="mb-4">
                    <label htmlFor="budget" className="block text-gray-100 text-sm font-bold mb-2">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder='e.g. Groceries' required ref={focusRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="newBudgetAmount" className="block text-gray-100 text-sm font-bold mb-2">Amount</label>
                    <input type="number" name="newBudgetAmount" id="newBudgetAmount" step={0.01} placeholder='e.g., $350' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" inputMode='decimal' required />
                </div>
                <div className="flex justify-center">
                    <input type="hidden" name="_action" value="createBudget" />
                    <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <span>{isSubmitting ? "Submitting..." : "Create Budget"}</span>
                    </button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm