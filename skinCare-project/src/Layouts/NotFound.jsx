import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Error 404 !</h1>
            <div >
                <Link to="/" className='btn'>Back to home</Link>
            </div>
        </div>
    );
};

export default NotFound;