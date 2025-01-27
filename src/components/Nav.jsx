import React from 'react'
import { Form, NavLink } from 'react-router-dom'

const Nav = ({ userName }) => {
    return (
        <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <NavLink to={"/"} aria-label='Go home'>
                    <span class="font-semibold text-xl tracking-tight">BAJIT</span>
                </NavLink>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">
                    <NavLink to={"/"} aria-label='Go home' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                        Home
                    </NavLink>
                </div>
                <div>
                    {userName && (
                        <Form method='post' action='logout' onSubmit={(event) => {
                            if (!confirm("Log out?")) {
                                event.preventDefault()
                            }
                        }}>
                            <button type='submit' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" >
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