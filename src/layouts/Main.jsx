import React from 'react'
import { fetchData } from '../helper'
import { Outlet, useLoaderData } from 'react-router-dom';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';


export function loadMain() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData();
    return (
        <div className='layout'>
            <Nav userName={userName} />
            <main className="py-25">
                <Outlet />
            </main>
            {userName && (<BottomNav />
            )}
        </div>
    )
}

export default Main