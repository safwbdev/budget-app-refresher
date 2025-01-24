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
        <div className='form-wrapper'>
            <h2>Create Budget</h2>
            <fetcher.Form method='post' className='grid-sm' ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="budget">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder='e.g. Groceries' required ref={focusRef} />
                </div>
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" name="newBudgetAmount" id="newBudgetAmount" step={0.01} placeholder='e.g., $350' inputMode='decimal' required />
                <div className="grid-xs">
                    <input type="hidden" name="_action" value="createBudget" />
                    <button type="submit" disabled={isSubmitting}>
                        <span>{isSubmitting ? "Submitting..." : "Create Budget"}</span>
                    </button>
                </div>

            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm