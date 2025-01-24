import React from 'react'
import { calculateSpentByBudget, formatCurrency, formstPercentage } from '../helper';
import { Form, Link } from 'react-router-dom';

const BudgetItem = ({ budget, showDelete = false }) => {

    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

    return (
        <div className='budgetCard' style={{ border: `1px solid rgb(${color})` }}>
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} budgeted</p>
            <progress max={amount} value={spent}>
                {formstPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small> | <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            <div className="flex-sm">
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
                        <button type="submit">
                            <span>Delete Budget</span>
                        </button>
                    </Form>
                ) : (
                    <Link to={`/budget/${id}`}>
                        <span>View details</span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default BudgetItem