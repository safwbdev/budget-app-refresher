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
        <div className='form-wrapper' style={{
            border:
                '1px solid red'
        }}>
            <h2>Add new
                <span style={{ color: 'red' }}>
                    {budgets.length === 1 && `${budgets.map((bud) => bud.name)}`}
                </span> Expense
            </h2>
            <fetcher.Form method='post' className='grid-sm' ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense</label>
                        <input type="text" name="newExpense" id="newExpense" placeholder='e.g. coffee' ref={focusRef} required />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" step={0.01} inputMode='decimal' name="newExpenseAmount" id="newExpenseAmount" placeholder='e.g. 3.50' required />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                    </select>
                </div>
                <input type="hidden" name="_action" value='createExpense' />
                <button type="submit" disabled={isSubmitting}>
                    <span>
                        {isSubmitting ? 'Submitting...' : 'Create Expense'}
                    </span>
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm