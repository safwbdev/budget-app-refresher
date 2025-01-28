import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import { ROOT } from '../routes';

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <div className='error'>
            <h1>There was an issue</h1>
            <p>{error.message || error.statusText}</p>
            <div className='flex'>
                <button onClick={() => navigate(-1)}></button>
                <Link to={ROOT} className="button">
                    <span>Go home</span>
                </Link>

            </div>
        </div>
    )
}

export default Error