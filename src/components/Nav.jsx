import React from 'react'
import { Form, NavLink } from 'react-router-dom'
import { Links } from '../links'
import { ROOT } from '../routes'
import { confirmLogout } from '../helper'

const Nav = ({ userName }) => {
    return (
        <nav className="fixed  w-full flex items-center justify-between flex-wrap bg-gray-800 p-6 z-10">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavLink to={ROOT} aria-label='Go home'>
                    <span className="font-semibold text-xl tracking-tight">BAJIT</span>
                </NavLink>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden`}>
                <div className="text-sm lg:flex-grow">
                    {Links.map((link, index) => (
                        <NavLink
                            aria-label={link.aria}
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                            key={index}
                            to={link.url}>
                            {link.label}
                        </NavLink>

                    ))}
                </div>
                <div>
                    {userName && (
                        <Form
                            action='logout'
                            method='post'
                            onSubmit={confirmLogout}>
                            <button
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                type='submit'>
                                <span>Log Out</span>
                            </button>
                        </Form>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav