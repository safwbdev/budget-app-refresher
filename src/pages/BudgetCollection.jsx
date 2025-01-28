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
                {budgets && budgets.map((bud) => (<BudgetItem key={bud.id} budget={bud} />))}
                {budgets && budgets.length > 0 ? (<AddBudgetForm />
                ) : (
                    <>
                        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6 flex justify-center items-center flex-col">
                            <p className='text-gray-100 text-lg font-bold'>No Budgets found</p>
                        </div>
                        <AddBudgetForm isBudgetEmpty />
                    </>
                )}
            </div>
        </div>
    )
}

export default BudgetCollection