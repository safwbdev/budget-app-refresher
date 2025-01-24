import React from 'react'
import { Form, NavLink } from 'react-router-dom'

const Nav = ({ userName }) => {
    return (
        <nav style={{ background: "#3b3b3b", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1em' }}>
            <NavLink to={"/"} aria-label='Go home'> Budget</NavLink>
            {userName && (
                <Form method='post' action='logout' onSubmit={(event) => {
                    if (!confirm("Log out?")) {
                        event.preventDefault()
                    }
                }}>
                    <button type='submit' className='logoutBtn' >
                        <span>Log Out</span>
                    </button>
                </Form>
            )}
        </nav>
    )
}

export default Nav