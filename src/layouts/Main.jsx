import React from 'react'
import { fetchData } from '../helper'
import { Outlet, useLoaderData } from 'react-router-dom';
import Nav from '../components/Nav';


export function loadMain() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData();
    return (
        <div className='layout' style={{ width: '100%' }}>
            <Nav userName={userName} />
            <main class="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Main