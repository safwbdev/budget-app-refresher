import React from 'react'
import { Form } from 'react-router-dom'
import { NEW_USER } from '../routes'

const Intro = () => {
    return (
        <div className='intro'>
            <div>
                <h1>Take control of <span>Your Money</span></h1>
                <p>Personal budgeting is the secret to financial freedom. Start your journey today</p>
                <Form method='post'>
                    <input type="text" name="userName" required placeholder='Enter name' aria-label='Your name' autoComplete='given-name' />
                    <input type="hidden" name="_action" value={NEW_USER} />
                    <button type="submit"><span>Create Account</span></button>
                </Form>
            </div>
        </div>
    )
}

export default Intro