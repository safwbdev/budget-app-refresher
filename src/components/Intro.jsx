import React from 'react'
import { Form } from 'react-router-dom'
import { NEW_USER } from '../routes'

const Intro = () => {
    return (
        <div className='intro px-6'>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                <div className="col-span-1 md:col-span-2">
                    <h1 className='text-2xl font-bold tracking-tight text-gray-900'>BAJIT</h1>
                    <h2>Take control of <span>Your Money</span></h2>
                    <p>Personal budgeting is the secret to financial freedom. Start your journey today</p>
                </div>
                <div className="colspan-1  md:order-last pt-6">
                    <div className="block max-w-sm p-6 py-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-6">
                        <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            Create an Account
                        </h3>
                        <Form method='post'>
                            <div className="mb-4">
                                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" name="userName" required placeholder='Enter name' aria-label='Your name' autoComplete='given-name' />
                                <input type="hidden" name="_action" value={NEW_USER} />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"><span>Create </span></button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro