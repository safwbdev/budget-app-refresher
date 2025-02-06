import React, { useEffect, useRef, useState } from 'react'
import { Form, useFetcher } from 'react-router-dom'
import { NEW_BUDGET } from '../../routes';
import { FaPlus } from "react-icons/fa";
const AddBudgetForm = ({ isBudgetEmpty = false, isHome = false }) => {
    console.log(isHome);

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const [openFormWindow, setOpenFormWindow] = useState(false);
    const isLoading = fetcher.state === "loading";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (isLoading) {
            formRef.current.reset();
            focusRef.current.focus();
            setOpenFormWindow(false);
        }
    }, [isLoading])

    useEffect(() => {
        if (!openFormWindow) {
            formRef.current.reset()
        }
    }, [openFormWindow])

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
                        <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'> {isBudgetEmpty ? "Create a budget to get started" : "New Budget"}</h3>
                        <div className="mb-4">
                            <label
                                htmlFor="budget"
                                className="block text-gray-100 text-sm font-bold mb-2">
                                Budget Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                id="newBudget"
                                name="newBudget"
                                placeholder='e.g. Groceries'
                                ref={focusRef}
                                required
                                type="text"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-100 text-sm font-bold mb-2"
                                htmlFor="newBudgetAmount" >
                                Amount
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                id="newBudgetAmount"
                                inputMode='decimal'
                                name="newBudgetAmount"
                                placeholder='e.g., $350'
                                step={0.01}
                                required
                                type="number"
                            />
                        </div>
                        <div className={`flex justify${openFormWindow ? '-between' : '-center'}`}>
                            <input
                                name="_action"
                                type="hidden"
                                value={NEW_BUDGET} />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={isSubmitting}
                                type="submit">
                                <span>{isSubmitting ? "Submitting..." : "Create Budget"}</span>
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
            </div >
        </>
    )
}

export default AddBudgetForm