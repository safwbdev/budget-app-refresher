import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../helper';
import BudgetItem from '../components/BudgetItem';
import AddBudgetForm from '../components/AddBudgetForm';
import { NEW_BUDGET } from '../routes';

export function loadBudgetCollection() {
    const budgets = fetchData("budgets");
    return { budgets }
}

export async function actionBudgetCollection({ request }) {
    await wait();
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === NEW_BUDGET) {
        try {
            createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
            return toast.success("Budget created!")
        } catch (e) {
            throw new Error("There was an issue with creating the budget.");
        }
    }
}

const BudgetCollection = () => {

    const { budgets } = useLoaderData();
    return (
        <div>
            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Your Budgets</h2>
            <div className="grid grid-cols-4">
                <div className="...">
                    {budgets && budgets.length > 0 ? (<AddBudgetForm />
                    ) : (<div className="grid-sm">
                        <p>Personal budgeting is the secret to financial freedom</p>
                        <p>Create a budget to get started</p>
                        <AddBudgetForm />
                    </div>)}
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-3">
                        {budgets.map((bud) => (<BudgetItem key={bud.id} budget={bud} />))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetCollection